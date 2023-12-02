package domain

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QuizModel struct {
	ID           primitive.ObjectID   `json:"id" bson:"_id"`
	Name         string               `json:"name"`
	Questions    []primitive.ObjectID `json:"questions"`
	ThumbnailUrl string               `json:"thumbnail_url"`
}

type CreateQuizDto struct {
	Name         string          `json:"name"`
	Questions    []CreateCardDto `json:"questions"`
	ThumbnailUrl string          `json:"thumbnail_url"`
}

func (dto CreateQuizDto) ToModel() QuizModel {
	return QuizModel{
		ID:           primitive.NewObjectID(),
		Name:         dto.Name,
		Questions:    []primitive.ObjectID{},
		ThumbnailUrl: dto.ThumbnailUrl,
	}
}
