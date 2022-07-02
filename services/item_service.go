package services

import (
	"context"
	"errors"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"inventory_management/graph/middleware"
	"inventory_management/graph/models"
)

func (s *Services) CreateItem(ctx context.Context, input models.CreateItemInput) (bool, error) {
	_, errAmn := s.UserRepo.AllowAccess(ctx, "Admin")
	_, errMrr := s.UserRepo.AllowAccess(ctx, "Moderator")
	if errAmn != nil && errMrr != nil {
		return false, errors.New("user has no permission for this action")
	}

	currentUser := middleware.ForContext(ctx)
	inventoryId, err := s.ItemRepo.GetInventoryID(currentUser.ID)

	if err != nil {
		return false, err
	}

	var crtItem = &models.Item{
		Name:          cases.Title(language.Croatian).String(input.Name),
		Description:   input.Description,
		Status:        cases.Title(language.Croatian).String(input.Status),
		InventoriesID: &inventoryId,
	}

	return s.ItemRepo.CreateItem(crtItem)
}

func (s *Services) GetItems(ctx context.Context) ([]*models.Item, error) {
	_, errAmn := s.UserRepo.AllowAccess(ctx, "Admin")
	_, errMrr := s.UserRepo.AllowAccess(ctx, "Moderator")
	if errAmn != nil && errMrr != nil {
		return nil, errors.New("user has no permission for this action")
	}

	currentUser := middleware.ForContext(ctx)
	inventoryId, err := s.ItemRepo.GetInventoryID(currentUser.ID)

	if err != nil {
		return nil, err
	}

	return s.ItemRepo.GetItems(inventoryId)
}

func (s *Services) GetAllItems(ctx context.Context) ([]*models.Item, error) {
	_, err := s.UserRepo.AllowAccess(ctx, "Admin")
	if err != nil {
		return nil, errors.New("user has no permission for this action")
	}

	if err != nil {
		return nil, err
	}

	return s.ItemRepo.GetAllItems()
}

func (s *Services) UpdateItem(ctx context.Context, input models.UpdateItemInput) (bool, error) {
	_, errAmn := s.UserRepo.AllowAccess(ctx, "Admin")
	_, errMrr := s.UserRepo.AllowAccess(ctx, "Moderator")
	if errAmn != nil && errMrr != nil {
		return false, errors.New("user has no permission for this action")
	}

	var updItem = &models.Item{
		ID:            input.ID,
		Name:          cases.Title(language.Croatian).String(*input.Name),
		Description:   *input.Description,
		Status:        cases.Title(language.Croatian).String(*input.Status),
		InventoriesID: input.InventoriesID,
	}

	return s.ItemRepo.UpdateItem(updItem)
}

func (s *Services) DeleteItem(ctx context.Context, itemId string) (bool, error) {
	_, errAmn := s.UserRepo.AllowAccess(ctx, "Admin")
	_, errMrr := s.UserRepo.AllowAccess(ctx, "Moderator")
	if errAmn != nil && errMrr != nil {
		return false, errors.New("user has no permission for this action")
	}

	if itemId == "" {
		return false, errors.New("inventoryId missing")
	}

	return s.ItemRepo.DeleteItem(itemId)
}
