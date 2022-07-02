package database

import (
	"context"
	"errors"
	"github.com/go-pg/pg"
	"inventory_management/graph/middleware"
	"inventory_management/graph/models"
)

type UserRepo struct {
	DB *pg.DB
}

//region Helpers

func (u *UserRepo) GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	err := u.DB.Model(&user).Where("username = ?", username).First()
	if err != nil {
		return nil, errors.New("error selecting user by username")
	}
	return &user, nil
}

func (u *UserRepo) GetUserByID(id string) bool {
	var user *models.User
	res, _ := u.DB.Model(user).Where("id = ?", id).Count()
	if res == 0 {
		return false
	}

	return true
}

func (u *UserRepo) UsernameExists(username string) bool {
	var user *models.User
	res, _ := u.DB.Model(user).Where("username = ?", username).Count()
	if res == 0 {
		return false
	}

	return true
}

func (u *UserRepo) GetRole(userId string) (int, error) {
	var user *models.User
	var roleId int
	err := u.DB.Model(user).Column("roles_id").Where("id = ?", userId).Select(&roleId)
	if err != nil {
		return 0, errors.New("no user with that id")

	}

	return roleId, nil
}

func (u *UserRepo) GetUserRole(userId string) (string, error) {
	var roleName string
	_, err := u.DB.Query(&roleName, `
	SELECT r.title
	FROM roles r
	JOIN users u ON u.roles_id = r.id
	WHERE u.id = ?
	`, userId)

	if err != nil {
		return "", errors.New("can't get role name")
	}

	return roleName, nil
}

func (u *UserRepo) AllowAccess(ctx context.Context, r string) (bool, error) {
	currentUser := middleware.ForContext(ctx)
	if currentUser == nil {
		return false, errors.New("user credentials not exist in token")
	}

	userRoleId, _ := u.GetRole(currentUser.ID)

	var tempId int
	var role *models.Role
	err := u.DB.Model(role).Column("id").Where("title = ?", r).Select(&tempId)
	if err != nil {
		return false, errors.New("error fetching roleId (required role not existing in database)")
	}
	if tempId != userRoleId {
		return false, errors.New("user has no permission for this action")
	}
	return true, nil
}

//endregion

func (u *UserRepo) CreateUser(input *models.User) (bool, error) {
	_, err := u.DB.Model(input).Insert()

	if err != nil {
		return false, errors.New("error creating User")
	}

	return true, nil
}

func (u *UserRepo) GetUsers() ([]*models.User, error) {
	var users []*models.User
	err := u.DB.Model(&users).Order("id").Select()

	if err != nil {
		return nil, errors.New("error fetching Users")
	}

	return users, nil
}

func (u *UserRepo) UpdateUser(input *models.User) (bool, error) {
	res, _ := u.DB.Model(input).WherePK().UpdateNotNull()
	if res.RowsAffected() == 0 {
		return false, errors.New("error updating User")
	}

	return true, nil
}

func (u *UserRepo) DeleteUser(userId string) (bool, error) {
	var user *models.User
	res, _ := u.DB.Model(user).Where("id = ?", userId).Delete()
	if res.RowsAffected() == 0 {
		return false, errors.New("error deleting User")
	}

	return true, nil
}
