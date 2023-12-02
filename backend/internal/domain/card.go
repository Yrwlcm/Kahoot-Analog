package domain

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CardModel struct {
	ID                 primitive.ObjectID `json:"id" bson:"_id"`
	Question           string             `json:"question"`
	Answers            [4]string          `json:"answers"`
	CorrectAnswerIndex int                `json:"correct_answer_index"`
	ThumbnailUrl       string             `json:"thumbnail_url"`
}

type CreateCardDto struct {
	Question           string    `json:"question"`
	Answers            [4]string `json:"answers"`
	CorrectAnswerIndex int       `json:"correct_answer_index"`
	ThumbnailUrl       string    `json:"thumbnail_url"`
}

func (dto CreateCardDto) ToModel() CardModel {
	return CardModel{
		ID:                 primitive.NewObjectID(),
		Question:           dto.Question,
		Answers:            dto.Answers,
		CorrectAnswerIndex: dto.CorrectAnswerIndex,
		ThumbnailUrl:       dto.ThumbnailUrl,
	}
}
