package repository

import (
	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Quiz interface {
	FindAll() ([]domain.QuizModel, error)
	FindById(id string) (domain.QuizModel, error)
	Insert(model domain.QuizModel) (primitive.ObjectID, error)
	// Update(id string, model *domain.QuizModel) error
	// Delete(id string) error
}

type Card interface {
	FindById(id string) (domain.CardModel, error)
	Insert(model domain.CardModel) (primitive.ObjectID, error)
	// Update(id string, model *domain.CardModel) error
	// Delete(id string) error
}

type Repository struct {
	Quiz Quiz
	Card Card
}

func New(db *mongo.Database) *Repository {
	return &Repository{
		Quiz: newQuizRepository(db.Collection("quiz")),
		Card: newCardRepository(db.Collection("card")),
	}
}
