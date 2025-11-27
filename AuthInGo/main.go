package main

import (
	"AuthInGo/app"
	"fmt"
)

func main() {
	cfg:=app.NewConfig(":8080")
	app:=app.NewApplication(cfg)

	app.Run()
	fmt.Println("Done")
}
