package http

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	v1 "github.com/kyeeego/Kahoot-Analog/backend/internal/delivery/http/v1"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/service"
)

type Handler struct {
	services *service.Service
	v        *validator.Validate
}

func New(services *service.Service) *Handler {
	return &Handler{
		services: services,
		v:        validator.New(),
	}
}

func (h *Handler) Init() *gin.Engine {
	router := gin.Default()

	router.Use(cors.Default())

	h.InitAPI(router)

	return router
}

func (h *Handler) InitAPI(router *gin.Engine) {
	v1h := v1.New(h.services)

	home := router.Group("/")
	{
		home.GET("/", func(c *gin.Context) {
			c.JSON(200, map[string]string{"Hello": "world"})
		})
	}

	api := router.Group("/api")
	{
		v1h.Init(api)
	}

}
