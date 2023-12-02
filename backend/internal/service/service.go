package service

import (
	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Service struct {
	Quiz Quiz
	Card Card
}

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

func New(repos *repository.Repository) *Service {
	return &Service{
		Quiz: newQuizService(repos.Quiz),
		Card: newCardService(repos.Card),
	}
}
