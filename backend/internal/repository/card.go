package repository

import (
	"context"

	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

type CardRepository struct {
	c *mongo.Collection
}

func newCardRepository(collection *mongo.Collection) *CardRepository {
	return &CardRepository{c: collection}
}

func (r *CardRepository) FindById(id string) (domain.CardModel, error) {
	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.CardModel{}, err
	}

	var res domain.CardModel
	err = r.c.FindOne(context.Background(), bson.M{"_id": objId}).Decode(&res)
	return res, err
}

func (r *CardRepository) Insert(model domain.CardModel) (primitive.ObjectID, error) {
	res, err := r.c.InsertOne(context.Background(), model)
	return res.InsertedID.(primitive.ObjectID), err
}

// func (r *CardRepository) Update(id string, model *domain.CardModel) error {
// }

// func (r *CardRepository) Delete(id string) error {
// }
