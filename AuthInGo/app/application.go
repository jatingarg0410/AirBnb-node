package app

import (
	"time"
	"net/http"
	"fmt"
)
//Config holds the application configuration
type Config struct{
 Addr string

}

type Application struct{
Config Config
}

//Constructor for Application
func NewApplication(config Config) *Application{
	return &Application{
		Config: config,
	}
}

//Constructor for Config
func NewConfig(addr string) Config{
	return Config{
		Addr: addr,
	}
}

func (app *Application) Run() error{
 server:=&http.Server{
Addr: app.Config.Addr,
Handler: nil,
ReadTimeout: 10*time.Second,
WriteTimeout: 10*time.Second,
 }

 fmt.Println("Starting server on", app.Config.Addr)
 return server.ListenAndServe()
}