package resolvers

import (
	"context"
	"inventory_management/graph/generated"
	"inventory_management/graph/models"
)

//region Query header
type queryResolver struct{ *Resolver }

func (q *Resolver) Query() generated.QueryResolver { return &queryResolver{q} }

//endregion

//region Query body

func (q *queryResolver) GetUsers(ctx context.Context) ([]*models.User, error) {
	return q.Services.GetUsers(ctx)
}

func (q *queryResolver) GetInventories(ctx context.Context) ([]*models.Inventory, error) {
	return q.Services.GetInventories(ctx)
}

func (q *queryResolver) GetItems(ctx context.Context) ([]*models.Item, error) {
	return q.Services.GetItems(ctx)
}

func (q *queryResolver) GetAllItems(ctx context.Context) ([]*models.Item, error) {
	return q.Services.GetAllItems(ctx)
}

func (q *queryResolver) GetUserRole(ctx context.Context) (string, error) {
	return q.Services.GetUserRole(ctx)
}

func (q *queryResolver) GetInventoryName(ctx context.Context) (string, error) {
	return q.Services.GetInventoryName(ctx)
}

//endregion
