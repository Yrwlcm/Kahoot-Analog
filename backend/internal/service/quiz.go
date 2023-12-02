package service

import (
	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QuizService struct {
	r repository.Quiz
}

func newQuizService(repo repository.Quiz) *QuizService {
	return &QuizService{r: repo}
}

func (s *QuizService) FindAll() ([]domain.QuizModel, error) {
	return s.r.FindAll()
}

func (s *QuizService) FindById(id string) (domain.QuizModel, error) {
	return s.r.FindById(id)
}

func (s *QuizService) Insert(model domain.QuizModel) (primitive.ObjectID, error) {
	return s.r.Insert(model)
}

// func (s *QuizService) Update(id string, model *domain.QuizModel) error {
// 	return s.r.Update(id, model)
// }

// func (s *QuizService) Delete(id string) error {
// 	return s.r.Delete(id)
// }
