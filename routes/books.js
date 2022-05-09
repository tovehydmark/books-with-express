//Lista alla böcker som finns i biblioteket
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {

    let allBooksPrinted = `

`

    res.send()
})


//Hantera böckerna med en global object array i denna publika mapp "books.js" 
let libraryBooks = [{
        "title": "Harry Potter",
        "authorFirstName": "J.K.",
        "authorLastName": "Rowling",
        "numberOfPages": 900,
        "onLoan": false
    },
    {
        "title": "Where the Rain is Born",
        "authorFirstName": "Anita",
        "authorLastName": "Nair",
        "numberOfPages": 297,
        "onLoan": false
    },
    {
        "title": "Tears of the Giraffe",
        "authorFirstName": "Alexander",
        "authorLastName": "McCall Smith",
        "numberOfPages": 217,
        "onLoan": false
    },
    {
        "title": "The Kite Runner",
        "authorFirstName": "Khaled",
        "authorLastName": "Hosseini",
        "numberOfPages": 371,
        "onLoan": false
    }
]




module.exports = router;