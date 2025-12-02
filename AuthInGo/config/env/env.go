package config

import (
	"github.com/joho/godotenv"
	"fmt"
	"os"
	"strconv"
)

func Load(){
	err:=godotenv.Load()
	if err!=nil{
		fmt.Println("Error loading .env file")
	}

}


func GetString(key string,fallback string)string{
	value,ok := os.LookupEnv(key)
	if !ok{
		return fallback
	}
	return value
}

func GetInt(key string,fallback int)int{
	value,ok := os.LookupEnv(key)
	if !ok{
		return fallback
	}
	intValue, err := strconv.Atoi(value)
	if err!=nil{
		fmt.Println(err)
		return fallback
	}
	return intValue
}

func GetBool(key string,fallback bool)bool{

	value,ok := os.LookupEnv(key)
	if !ok{
		return fallback
	}
	boolValue, err := strconv.ParseBool(value)
	if err!=nil{
		fmt.Println(err)
		return fallback
	}
	return boolValue
}

