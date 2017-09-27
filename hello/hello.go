package main

import (
	"fmt"
	"os"
	"io/ioutil"
	"net/http"
)

type rsvp struct {
	Name string `json:name`
	Available string `json:available`
	Food string `json:food`
}

func handleRSVP(rw http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {

		f, err := os.OpenFile("results.csv", os.O_WRONLY | os.O_CREATE | os.O_TRUNC, 0777)
		if err != nil {
		    panic(err)
		}
		defer f.Close()

		responseData, err := ioutil.ReadAll(req.Body)
		fmt.Println(string(responseData))
		f.Write(responseData)
		rw.WriteHeader(http.StatusCreated)
    rw.Write([]byte("201 - Created"))
	} else {
		http.ServeFile(rw, req, "./rsvp.html")
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/rsvp", handleRSVP)
	http.ListenAndServe(":3000", nil)
}
