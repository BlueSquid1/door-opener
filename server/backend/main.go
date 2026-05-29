package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	// Serve static files (index.html, index.js, etc.)
	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)

	// API endpoint that handles frontend requests
	http.HandleFunc("/api/v1/trigger", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		resp, err := http.Post("http://192.168.10.101/door/trigger?duration=500", "", nil)
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

	// API endpoint that handles frontend requests
	http.HandleFunc("/api/v1/status", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
			return
		}

		resp, err := http.Get("http://192.168.10.101/door/status")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			response := map[string]interface{}{"message": fmt.Sprintf("Error: %v", err)}
			responseBytes, _ := json.Marshal(response)
			_, _ = w.Write(responseBytes)
			return
		}
		defer resp.Body.Close()

		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, "failed to read string from door sensor", http.StatusInternalServerError)
			return
		}
		bodyString := string(bodyBytes)

		// Respond to frontend
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{"status": bodyString}
		responseBytes, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "failed to encode json response", http.StatusInternalServerError)
			return
		}
		_, _ = w.Write(responseBytes)
	})

	fmt.Println("Server running at http://0.0.0.0:80")
	log.Fatal(http.ListenAndServe(":80", nil))
}
