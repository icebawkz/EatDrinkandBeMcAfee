package main

import (
	"fmt"
	"net/http"
)

type rsvp_struct struct {
	Name   []string `json:"name"`
	Inches []string `json:"inches"`
}

func rsvp(rw http.ResponseWriter, req *http.Request) {
	fmt.Println("Hello from func")
	if req.Method == "POST" {
		fmt.Println("Received a POST")
		req.ParseForm()
		fmt.Println(req.Form)

	} else {
		fmt.Println(req.URL.Path[1:])
		http.ServeFile(rw, req, "./static/rsvp.html")
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/rsvp", rsvp)
	http.ListenAndServe(":3000", nil)
}
