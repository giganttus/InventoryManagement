package services

import "inventory_management/database"

type Services struct {
	UserRepo      database.UserRepo
	ItemRepo      database.ItemRepo
	InventoryRepo database.InventoryRepo
}

func NewService(userRepo database.UserRepo, itemRepo database.ItemRepo, inventoryRepo database.InventoryRepo) *Services {
	return &Services{UserRepo: userRepo, ItemRepo: itemRepo, InventoryRepo: inventoryRepo}
}
