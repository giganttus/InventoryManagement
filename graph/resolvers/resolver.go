package resolvers

import (
	"github.com/go-pg/pg"
	"inventory_management/services"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Services *services.Services
	DB       *pg.DB
}
