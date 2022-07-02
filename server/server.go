package main

import (
	"github.com/go-chi/chi"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"inventory_management/database"
	"inventory_management/graph/generated"
	"inventory_management/graph/middleware"
	"inventory_management/graph/resolvers"
	"inventory_management/services"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env variables")
	}

	Database := database.Connect()

	userRepo := database.UserRepo{DB: Database}
	inventoryRepo := database.InventoryRepo{DB: Database}
	itemRepo := database.ItemRepo{DB: Database}

	s := services.NewService(userRepo, itemRepo, inventoryRepo)

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080", "http://localhost:3000"},
		AllowedHeaders:   []string{"Authorization", "Content-Type", "Token"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolvers.Resolver{Services: s}}))

	wrapped := middleware.AuthMiddleware(srv)
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", wrapped)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe("127.0.0.1:"+port, router))

}
