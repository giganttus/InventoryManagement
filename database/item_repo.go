package database

import (
	"errors"
	"github.com/go-pg/pg"
	"inventory_management/graph/models"
)

type ItemRepo struct {
	DB *pg.DB
}

//region Helpers

func (i *ItemRepo) GetInventoryID(userId string) (string, error) {
	var user *models.User
	var inventoryId string
	err := i.DB.Model(user).Column("inventories_id").Where("id = ?", userId).Select(&inventoryId)

	if err != nil {
		return "", errors.New("error getting inventory id")
	}

	return inventoryId, nil
}

//endregion

func (i *ItemRepo) CreateItem(input *models.Item) (bool, error) {
	_, err := i.DB.Model(input).Insert()

	if err != nil {
		return false, errors.New("error creating Item")
	}

	return true, nil
}

func (i *ItemRepo) GetItems(inventoryId string) ([]*models.Item, error) {
	var items []*models.Item
	err := i.DB.Model(&items).Where("inventories_id = ?", inventoryId).Order("id").Select()

	if err != nil {
		return nil, errors.New("error fetching Items")
	}

	return items, nil
}

func (i *ItemRepo) GetAllItems() ([]*models.Item, error) {
	var items []*models.Item
	err := i.DB.Model(&items).Order("inventories_id").Select()

	if err != nil {
		return nil, errors.New("error fetching all Items")
	}

	return items, nil
}

func (i *ItemRepo) UpdateItem(input *models.Item) (bool, error) {
	res, _ := i.DB.Model(input).WherePK().UpdateNotNull()
	if res.RowsAffected() == 0 {
		return false, errors.New("error updating Item")
	}

	return true, nil
}

func (i *ItemRepo) DeleteItem(itemId string) (bool, error) {
	var item *models.Item
	res, _ := i.DB.Model(item).Where("id = ?", itemId).Delete()
	if res.RowsAffected() == 0 {
		return false, errors.New("error deleting Item")
	}

	return true, nil
}
