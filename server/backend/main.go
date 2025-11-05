package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Serve static files (index.html, index.js, etc.)
	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)

	// API endpoint that handles frontend requests
	http.HandleFunc("/api/v1", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		// Handle the request logic here
		resp, err := http.Post("http://192.168.10.100/trigger?duration=400", "", nil)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := map[string]interface{}{"message": fmt.Sprintf("Error: %v", err)}
			responseBytes, _ := json.Marshal(response)
			_, _ = w.Write(responseBytes)
			return
		}
		defer resp.Body.Close()

		// Respond to frontend
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"message": "Server received your request!"}`))
	})

	fmt.Println("Server running at http://0.0.0.0:80")
	log.Fatal(http.ListenAndServe(":80", nil))
}
