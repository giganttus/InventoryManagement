package resolvers

import (
	"context"
	"inventory_management/graph/generated"
	"inventory_management/graph/models"
)

//region Mutation header
type mutationResolver struct{ *Resolver }

func (m *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{m} }

//endregion

//region Mutation body

//region User
func (m *mutationResolver) CreateUser(ctx context.Context, input models.CreateUserInput) (bool, error) {
	return m.Services.CreateUser(ctx, input)
}

func (m *mutationResolver) Login(ctx context.Context, input models.LoginInput) (string, error) {
	return m.Services.Login(input)
}

func (m *mutationResolver) UpdateUser(ctx context.Context, input models.UpdateUserInput) (bool, error) {
	return m.Services.UpdateUser(ctx, input)
}

func (m *mutationResolver) DeleteUser(ctx context.Context, userID string) (bool, error) {
	return m.Services.DeleteUser(ctx, userID)
}

//endregion

//region Inventory
func (m *mutationResolver) CreateInventory(ctx context.Context, input models.CreateInvInput) (bool, error) {
	return m.Services.CreateInventory(ctx, input)
}

func (m *mutationResolver) UpdateInventory(ctx context.Context, input models.UpdateInvInput) (bool, error) {
	return m.Services.UpdateInventory(ctx, input)
}

func (m *mutationResolver) DeleteInventory(ctx context.Context, inventoryID string) (bool, error) {
	return m.Services.DeleteInventory(ctx, inventoryID)
}

//endregion

//region Item
func (m *mutationResolver) CreateItem(ctx context.Context, input models.CreateItemInput) (bool, error) {
	return m.Services.CreateItem(ctx, input)
}

func (m *mutationResolver) UpdateItem(ctx context.Context, input models.UpdateItemInput) (bool, error) {
	return m.Services.UpdateItem(ctx, input)
}

func (m *mutationResolver) DeleteItem(ctx context.Context, itemID string) (bool, error) {
	return m.Services.DeleteItem(ctx, itemID)
}

//endregion

//endregion
