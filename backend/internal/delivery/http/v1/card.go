package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) initCard(r *gin.RouterGroup) {
	quiz := r.Group("/card")
	{
		quiz.GET("", h.findCardById)
	}
}

func (h *Handler) findCardById(c *gin.Context) {
	quiz, err := h.services.Card.FindById(c.Query("id"))
	if err != nil {
		h.die(c, err, http.StatusNotFound)
		return
	}

	c.JSON(200, quiz)
}
