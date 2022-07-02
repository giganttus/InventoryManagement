package services

import (
	"context"
	"errors"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"inventory_management/graph/middleware"
	"inventory_management/graph/models"
)

func (s *Services) CreateInventory(ctx context.Context, input models.CreateInvInput) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}

	input.Name = cases.Title(language.Croatian).String(input.Name)

	invExist := s.InventoryRepo.InventoryExists(input.Name)
	if invExist == true {
		return false, errors.New("inventory with that name  already exists")
	}

	var crtInventory = &models.Inventory{
		Name:    input.Name,
		Address: input.Address,
	}

	return s.InventoryRepo.CreateInventory(crtInventory)
}

func (s *Services) GetInventories(ctx context.Context) ([]*models.Inventory, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return nil, err
	}

	return s.InventoryRepo.GetInventories()
}

func (s *Services) UpdateInventory(ctx context.Context, input models.UpdateInvInput) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}

	var updInventory = &models.Inventory{
		ID:      input.ID,
		Name:    *input.Name,
		Address: *input.Address,
	}

	return s.InventoryRepo.UpdateInventory(updInventory)
}

func (s *Services) DeleteInventory(ctx context.Context, inventoryId string) (bool, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return false, err
	}
	if inventoryId == "" {
		return false, errors.New("inventoryId missing")
	}

	return s.InventoryRepo.DeleteInventory(inventoryId)
}

func (s *Services) GetInventoryName(ctx context.Context) (string, error) {
	_, errAmn := s.UserRepo.AllowAccess(ctx, "Admin")
	_, errMrr := s.UserRepo.AllowAccess(ctx, "Moderator")
	if errAmn != nil && errMrr != nil {
		return "", errors.New("user has no permission for this action")
	}

	currentUser := middleware.ForContext(ctx)
	if currentUser == nil {
		return "", errors.New("user credentials not exist in token")
	}

	return s.InventoryRepo.GetInventoryName(currentUser.ID)
}
