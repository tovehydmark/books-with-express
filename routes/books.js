//Lista alla böcker som finns i biblioteket
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {

    let allBooks;

    libraryBooks.forEach(book => {
        allBooks += `
        <article>
        <h2>Titel: ${book.title}</h2>
        <p>Författare: ${book.authorFirstName + book.authorLastName}</p>
        <p>Antal sidor: ${book.numberOfPages}</p>
        <p>Utlånad: ${book.onLoan}</p>
      </article>
        `
    });


    res.send(allBooks)
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