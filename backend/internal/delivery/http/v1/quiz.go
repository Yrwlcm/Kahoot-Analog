package v1

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (h *Handler) initQuiz(r *gin.RouterGroup) {
	quiz := r.Group("/quiz")
	{
		quiz.GET("/all", h.findAllQuizzes)
		quiz.GET("", h.findQuizById)

		quiz.POST("/create", h.createQuiz)
	}
}

func (h *Handler) findAllQuizzes(c *gin.Context) {
	quizzes, err := h.services.Quiz.FindAll()
	if err != nil {
		h.die(c, err, http.StatusNotFound)
		return
	}

	c.JSON(200, quizzes)
}

func (h *Handler) findQuizById(c *gin.Context) {
	quiz, err := h.services.Quiz.FindById(c.Query("id"))
	if err != nil {
		h.die(c, err, http.StatusNotFound)
		return
	}

	c.JSON(200, quiz)
}

func (h *Handler) createQuiz(c *gin.Context) {
	var body domain.CreateQuizDto

	if err := c.BindJSON(&body); err != nil {
		h.die(c, err, http.StatusBadRequest)
		return
	}

	ids := []primitive.ObjectID{}
	for _, cardDto := range body.Questions {
		model := cardDto.ToModel()

		id, err := h.services.Card.Insert(model)
		if err != nil {
			log.Printf("you fucked up mate: %s", err)
			continue
		}

		ids = append(ids, id)
	}

	quizModel := body.ToModel()
	quizModel.Questions = ids

	quizId, err := h.services.Quiz.Insert(quizModel)
	if err != nil {
		h.die(c, err, http.StatusInternalServerError)
		return
	}

	c.JSON(201, map[string]string{"id": quizId.Hex()})
}
