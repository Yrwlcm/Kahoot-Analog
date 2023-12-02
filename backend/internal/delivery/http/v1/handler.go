package v1

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/service"
)

type Handler struct {
	services  *service.Service
	validator *validator.Validate
}

type Error struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func New(services *service.Service) *Handler {
	return &Handler{
		services:  services,
		validator: validator.New(),
	}
}

func (h *Handler) Init(r *gin.RouterGroup) {
	v1 := r.Group("/v1")
	{
		h.initQuiz(v1)
		h.initCard(v1)
	}
}

func (h *Handler) die(c *gin.Context, err error, status int) {
	log.Println(err)
	msg := fmt.Sprintf("Error requesting '%s':%v\n", c.FullPath(), err)
	c.AbortWithStatusJSON(status, Error{Status: status, Message: msg})
}
