package database

import (
	"errors"
	"github.com/go-pg/pg"
	"inventory_management/graph/models"
)

type InventoryRepo struct {
	DB *pg.DB
}

//region Helpers
func (i *InventoryRepo) InventoryExists(name string) bool {
	var inventory *models.Inventory
	res, _ := i.DB.Model(inventory).Where("name = ?", name).Count()
	if res == 0 {
		return false
	}

	return true
}

func (i *InventoryRepo) GetInventoryName(userId string) (string, error) {
	var inventoryName string
	_, err := i.DB.Query(&inventoryName, `
	SELECT i.name
	FROM inventories i
	JOIN users u ON u.inventories_id = i.id
	WHERE u.id = ?
	`, userId)

	if err != nil {
		return "", errors.New("can't get inventory name")
	}

	return inventoryName, nil
}

//endregion

func (i *InventoryRepo) GetInventories() ([]*models.Inventory, error) {
	var inventories []*models.Inventory
	err := i.DB.Model(&inventories).Order("id").Select()

	if err != nil {
		return nil, errors.New("error fetching Inventories")
	}

	return inventories, nil
}

func (i *InventoryRepo) CreateInventory(input *models.Inventory) (bool, error) {
	_, err := i.DB.Model(input).Insert()
	if err != nil {
		return false, errors.New("error creating Inventory")
	}

	return true, nil
}

func (i *InventoryRepo) UpdateInventory(input *models.Inventory) (bool, error) {
	res, _ := i.DB.Model(input).WherePK().UpdateNotNull()
	if res.RowsAffected() == 0 {
		return false, errors.New("error updating Inventory")
	}

	return true, nil
}

func (i *InventoryRepo) DeleteInventory(inventoryId string) (bool, error) {
	var inventory *models.Inventory
	res, err := i.DB.Model(inventory).Where("id = ?", inventoryId).Delete()

	if err != nil {
		return false, errors.New("error deleting relational data")
	}

	if res.RowsAffected() == 0 {
		return false, errors.New("error deleting Inventory (not existing)")
	}

	return true, nil
}
