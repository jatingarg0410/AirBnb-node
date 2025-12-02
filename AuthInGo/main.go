package main

import (
	"AuthInGo/app"
	"fmt"
	"AuthInGo/config/env"
)

func main() {
	config.Load()
	cfg:=app.NewConfig()
	app:=app.NewApplication(cfg)

	app.Run()
	fmt.Println("Done")
}
