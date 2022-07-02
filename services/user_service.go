package services

import (
	"context"
	"errors"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"inventory_management/graph/middleware"
	"inventory_management/graph/models"
)

func (s *Services) CreateUser(ctx context.Context, input models.CreateUserInput) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}

	usrExist := s.UserRepo.UsernameExists(input.Username)
	if usrExist == true {
		return false, errors.New("username exists")
	}

	hashPw, hashErr := models.HashPassword(input.Password)
	if hashErr != nil {
		return false, errors.New("error hashing password")
	}

	var crtUser = &models.User{
		FirstName:     cases.Title(language.Croatian).String(input.FirstName),
		LastName:      cases.Title(language.Croatian).String(input.LastName),
		Username:      input.Username,
		Password:      hashPw,
		RolesID:       input.RolesID,
		InventoriesID: input.InventoriesID,
	}
	return s.UserRepo.CreateUser(crtUser)
}

func (s *Services) GetUsers(ctx context.Context) ([]*models.User, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return nil, err
	}
	return s.UserRepo.GetUsers()
}

func (s *Services) UpdateUser(ctx context.Context, input models.UpdateUserInput) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}

	if *input.Password != "" {
		hsPw, hsErr := models.HashPassword(*input.Password)
		if hsErr != nil {
			return false, errors.New("error hashing password")
		}
		input.Password = &hsPw
	}

	var updInput = &models.User{
		ID:            input.ID,
		FirstName:     cases.Title(language.Croatian).String(*input.FirstName),
		LastName:      cases.Title(language.Croatian).String(*input.LastName),
		Username:      *input.Username,
		Password:      *input.Password,
		RolesID:       *input.RolesID,
		InventoriesID: input.InventoriesID,
	}

	return s.UserRepo.UpdateUser(updInput)
}

func (s *Services) DeleteUser(ctx context.Context, userId string) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}
	if userId == "" {
		return false, errors.New("userId missing")
	}

	return s.UserRepo.DeleteUser(userId)
}

func (s *Services) GetUserRole(ctx context.Context) (string, error) {
	currentUser := middleware.ForContext(ctx)
	if currentUser == nil {
		return "", errors.New("user credentials not exist in token")
	}

	return s.UserRepo.GetUserRole(currentUser.ID)
}
