package app

import (
	"AuthInGo/config/env"
	"AuthInGo/controllers"
	db "AuthInGo/db/repostitories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"
)

//Config holds the application configuration
type Config struct{
 Addr string

}

type Application struct{
Config Config
Store db.Storage
}

//Constructor for Application
func NewApplication(config Config) *Application{
	return &Application{
		Config: config,
		Store: *db.NewStorage(),
	}
}

//Constructor for Config
func NewConfig() Config{
	port := config.GetString("PORT", ":8080")
	return Config{
		Addr: port,
	}
}

func (app *Application) Run() error{

	ur:=db.NewUserRepository()
	us:=services.NewUserService(ur)
	uc:=controllers.NewUserController(us)
	uRouter:=router.NewUserRouter(uc)

 server:=&http.Server{
Addr: app.Config.Addr,
Handler: router.SetUpRouter(uRouter),
ReadTimeout: 10*time.Second,
WriteTimeout: 10*time.Second,
 }

 fmt.Println("Starting server on", app.Config.Addr)
 return server.ListenAndServe()
}