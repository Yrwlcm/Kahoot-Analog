package main

import (
	"log"
	"os"

	"github.com/kyeeego/Kahoot-Analog/backend"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/delivery/http"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/repository"
	"github.com/kyeeego/Kahoot-Analog/backend/internal/service"
	"github.com/kyeeego/Kahoot-Analog/backend/pkg/database"
)

func main() {
	db, err := database.New(os.Getenv("DB_URI"), "kawhot")
	if err != nil {
		log.Fatalf("Could not connect to the database: %s\n", err)
	}
	log.Println("Connected to the database...")

	repos := repository.New(db)
	services := service.New(repos)
	handler := http.New(services)

	srv := &backend.Server{}
	if err := srv.Run(8081, handler.Init()); err != nil {
		log.Fatalf("Error while trying to run the server: %e\n", err)
	}
}
