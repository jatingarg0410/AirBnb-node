package config

import (
	env "AuthInGo/config/env"
	db "AuthInGo/db/repostitories"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetupDB()(*sql.DB,error){
cfg := mysql.NewConfig()
cfg.User = env.GetString("DB_USER","root")
cfg.Passwd = env.GetString("DB_PASS","root")
cfg.Net = env.GetString("DB_NET","tcp")
cfg.DBName = env.GetString("DB_NAME","auth_dev")
cfg.Addr = env.GetString("DB_ADDR","127.0.0.1 :3306")

fmt.Println("Connecting to Database",cfg.DBName)

db, err :=sql.Open("mysql", cfg.FormatDSN())
if err != nil {
	fmt.Println("Error connecting to database",err)
	return nil,err

}

fmt.Println("Trying to connect to the database")
pingErr := db.Ping()
if pingErr != nil {
	fmt.Println("Error pinging database",pingErr)
	return nil,pingErr
}
fmt.Println("Connected to the database successfully!",cfg.DBName)

return db,nil
}
