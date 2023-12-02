package service

import (
	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CardService struct {
	r repository.Card
}

func newCardService(repo repository.Card) *CardService {
	return &CardService{r: repo}
}

func (s *CardService) FindById(id string) (domain.CardModel, error) {
	return s.r.FindById(id)
}

func (s *CardService) Insert(model domain.CardModel) (primitive.ObjectID, error) {
	return s.r.Insert(model)
}

// func (s *CardService) Update(id string, model *domain.CardModel) error {
// 	return s.r.Update(id, model)
// }

// func (s *CardService) Delete(id string) error {
// 	return s.r.Delete(id)
// }
