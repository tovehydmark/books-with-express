//Lista alla böcker som finns i biblioteket
var express = require('express');
var router = express.Router();
var rand = require("random-key")


router.get('/', function (req, res) {

    let allBooks;

    libraryBooks.forEach(book => {
        allBooks += `
        <article>
        <h2>Titel: ${book.title}</h2>
        <p>Författare: ${book.authorFirstName + book.authorLastName}</p>
        <p>Antal sidor: ${book.numberOfPages}</p>
        <p>Utlånad: ${book.onLoan}</p>
        <a href="http://localhost:3000/books/${book.bookId}">Visa mer info om boken</a>
      </article>
        `
    });

    res.send(allBooks)
})

router.get('/:bookid', function (req, res) {

    let showBook = libraryBooks.find((book) => book.bookId == req.params.bookid);

    if (!showBook) {
        return res.send("Det finns ingen bok med id " + req.params.bookid)
    }

    let chosenBook = `<h2>Titel: ${showBook.title}</h2>
    <p>Författare: ${showBook.authorFirstName + showBook.authorLastName}</p>
    <p>Antal sidor: ${showBook.numberOfPages}</p>
    <p>Utlånad: ${showBook.onLoan}</p>`

    res.send(chosenBook)
})


//Hantera böckerna med en global object array i denna publika mapp "books.js" 
let libraryBooks = [{
        "title": "Harry Potter",
        "authorFirstName": "J.K.",
        "authorLastName": "Rowling",
        "numberOfPages": 900,
        "bookId": rand.generate(),
        "onLoan": false
    },
    {
        "title": "Where the Rain is Born",
        "authorFirstName": "Anita",
        "authorLastName": "Nair",
        "numberOfPages": 297,
        "bookId": rand.generate(),
        "onLoan": false
    },
    {
        "title": "Tears of the Giraffe",
        "authorFirstName": "Alexander",
        "authorLastName": "McCall Smith",
        "numberOfPages": 217,
        "bookId": rand.generate(),
        "onLoan": false
    },
    {
        "title": "The Kite Runner",
        "authorFirstName": "Khaled",
        "authorLastName": "Hosseini",
        "numberOfPages": 371,
        "bookId": rand.generate(),
        "onLoan": false
    }
]




module.exports = router;