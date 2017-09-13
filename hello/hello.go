package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type rsvp_struct struct {
	Name   []string `json:"name"`
	Inches []string `json:"inches"`
}

func rsvp(rw http.ResponseWriter, req *http.Request) {
	fmt.Println("Hello from func")
	if req.Method == "POST" {
		fmt.Println("Received a POST")
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			rw.Write([]byte("500 - Internal Server Error!"))
		}
		var rsvp rsvp_struct
		err = json.Unmarshal(body, &rsvp)
		if err != nil {
			panic(err)
		}
		log.Println(rsvp.Name)
		log.Println(rsvp.Inches)

		file, err := os.Create("result.csv")
		if err != nil {
			panic(err)
		}
		defer file.Close()

		writer := csv.NewWriter(file)
		defer writer.Flush()

		err = writer.Write(rsvp.Name)
		err = writer.Write(rsvp.Inches)

	} else {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		rw.Write([]byte("405 - Method not Allowed!"))
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/rsvp", rsvp)
	http.ListenAndServe(":3000", nil)
}
