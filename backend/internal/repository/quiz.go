package repository

import (
	"context"

	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
)

type QuizRepository struct {
	c *mongo.Collection
}

func newQuizRepository(collection *mongo.Collection) *QuizRepository {
	return &QuizRepository{c: collection}
}

func (r *QuizRepository) FindAll() ([]domain.QuizModel, error) {
	cur, err := r.c.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	var res []domain.QuizModel
	err = cur.All(context.Background(), &res)
	return res, err
}

func (r *QuizRepository) FindById(id string) (domain.QuizModel, error) {
	objId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.QuizModel{}, err
	}

	var res domain.QuizModel
	err = r.c.FindOne(context.Background(), bson.M{"_id": objId}).Decode(&res)
	return res, err
}

func (r *QuizRepository) Insert(model domain.QuizModel) (primitive.ObjectID, error) {
	res, err := r.c.InsertOne(context.Background(), model)
	return res.InsertedID.(primitive.ObjectID), err
}

// func (r *QuizRepository) Update(id string, model *domain.QuizModel) error {

// }

// func (r *QuizRepository) Delete(id string) error {
// }
