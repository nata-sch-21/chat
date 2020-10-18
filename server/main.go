package main

import (
	"database/sql"
	"net/http"
	"fmt"
	"log"
	"os"
	"time"
    "github.com/gorilla/websocket"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	pq "github.com/lib/pq"
)

type Message struct {
    Email    string `json:"email"`
    Username string `json:"username"`
    Message  string `json:"message"`
    Id       string `json:"id"`
    Avatar   string `json:"avatar"`
}

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel
// Configure the upgrader
var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
    // Upgrade initial GET request to a websocket
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Fatal(err)
    }
    // Make sure we close the connection when the function returns
    defer ws.Close()

    // Register new client
    clients[ws] = true

    for {
        var msg Message
        // Read in a new message as JSON and map it to a Message object
        err := ws.ReadJSON(&msg)
        if err != nil {
            log.Printf("error: %v", err)
            delete(clients, ws)
            break
        }
        // Send the newly received message to the broadcast channel
        broadcast <- msg
    }
}

func handleMessages() {
    for {
        // Grab the next message from the broadcast channel
        msg := <-broadcast
        // Send it out to every client that is currently connected
        for client := range clients {
            err := client.WriteJSON(msg)
            if err != nil {
                log.Printf("error: %v", err)
                client.Close()
                delete(clients, client)
            }
        }
    }
}

func registerPing(db *sql.DB) {
	_, err := db.Exec("INSERT INTO ping_timestamp (occurred) VALUES ($1)", time.Now())
	if err != nil {
		log.Println("Couldn't insert the ping")
		log.Println(err)
	}
}

func pingFunc(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		defer registerPing(db)
		r := db.QueryRow("SELECT occurred FROM ping_timestamp ORDER BY id DESC LIMIT 1")
		var lastDate pq.NullTime
		r.Scan(&lastDate)

		message := "first time!"
		if lastDate.Valid {
			message = fmt.Sprintf("%v ago", time.Now().Sub(lastDate.Time).String())
		}

		c.JSON(200, gin.H{
			"message": message,
		})
	}
}

func configFunc() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{
			"clientId": os.Getenv("CLIENT_ID"),
			"baseUrl": os.Getenv("BASE_URL"),
			"authUrl": os.Getenv("AUTH_URL"),
			"userInfoUrl": os.Getenv("USER_INFO_URL"),
			"wsUrl": os.Getenv("WS_URL"),
		})
	}
}

func main() {
	r := gin.Default()
	// Serving static content from web - we will populate this from within the docker container
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.Use(static.Serve("/ping", static.LocalFile("./web", true)))
	api := r.Group("/api")
	dbUrl := os.Getenv("DATABASE_URL")
	log.Printf("DB [%s]", dbUrl)
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}

	api.GET("/ping", pingFunc(db))
	api.GET("/config", configFunc())

    r.GET("/ws", func(c *gin.Context) {
        handleConnections(c.Writer, c.Request)
    })

    // Start listening for incoming chat messages
    go handleMessages()

	r.Run()
}