package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID            string  `json:"id"`
	FirstName     string  `json:"firstName"`
	LastName      string  `json:"lastName"`
	Username      string  `json:"username"`
	Password      string  `json:"password"`
	RolesID       string  `json:"rolesId"`
	InventoriesID *string `json:"inventoriesId"`
}

func (u *User) ComparePassword(password string) error {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(u.Password)
	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}
