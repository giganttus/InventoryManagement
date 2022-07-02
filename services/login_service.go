package services

import (
	"errors"
	"fmt"
	"inventory_management/graph/middleware"
	"inventory_management/graph/models"
)

var jwtID string
var accessToken string

func (s *Services) Login(input models.LoginInput) (string, error) {
	user, err := s.UserRepo.GetUserByUsername(input.Username)
	if err != nil {
		return "", errors.New("wrong login credentials (username)")
	}

	pwCmp := user.ComparePassword(input.Password)
	if pwCmp != nil {
		return "", errors.New("wrong login credentials (password)")
	}

	token, err2 := middleware.GenerateToken(*user)
	if err2 != nil {
		return "", err2
	}

	return fmt.Sprintf("%s", token), nil
}
