//Lista alla böcker som finns i biblioteket
var express = require('express');
const {
    get
} = require('express/lib/response');
var router = express.Router();
var rand = require("random-key")

//Gets all books in library and prints them on page
router.get('/', function (req, res) {

    let allBooks;

    libraryBooks.forEach(book => {
        allBooks += `
        <article>
        <h2>Titel: ${book.title}</h2>
        <p>Utlånad: ${book.onLoan}</p>
        <a href="http://localhost:3000/books/bookinfo/${book.bookId}">Visa mer info om boken</a>
      </article>
        `
    });

    res.send(allBooks)
})


//When clicking the link, the information on the specific book is shown on separate url
router.get('/bookinfo/:bookid', function (req, res) {

    let showBook = libraryBooks.find((book) => book.bookId == req.params.bookid);

    if (!showBook) {
        return res.send("Det finns ingen bok med id " + req.params.bookid)
    }

    let chosenBook = `
    <h2>Titel: ${showBook.title}</h2>
    <p>Författare: ${showBook.authorFirstName + showBook.authorLastName}</p>
    <p>Antal sidor: ${showBook.numberOfPages}</p>
    <p>Utlånad: ${showBook.onLoan}</p>
    <a href="http://localhost:3000/books/lend/${showBook.bookId}">Låna boken</a>`

    res.send(chosenBook)
})



//Link to lend the book. When clicked, the books status onLoan goes from false to true on start page
router.get('/lend/:bookId', function (req, res) {
    let showBook = libraryBooks.find((book) => book.bookId == req.params.bookId);

    if (!showBook) {
        return res.send("Det finns ingen bok med id " + showBook.bookId)
    }
    showBook.onLoan = true
    res.send("Du har nu lånat boken " + showBook.title)
})




//Add new book with post
router.get('/addbook', function (req, res) {

    let addBook = `
    
  <h1>Registrera ny bok i biblioteket</h1>

  <form action="addbook" method="post">
    <label for="title">Bokens titel: </label>
    <input type="text" name="title" id="title">

    <label for="authorFirstName">Författarens förnamn</label>
    <input type="text" name="authorFirstName" id="authorFirstName">

    <label for="authorLastName">Författarens efternamn: </label>
    <input type="text" name="authorLastName" id="authorLastName">

    <label for="numberOfPages">Sidantal: </label>
    <input type="text" name="numberOfPages" id="numberOfPages">

    <button id="saveNewBookBtn">Spara</button>
  </form>`

    res.send(addBook)
})


router.post('/addbook', function (req, res) {

    let newBook = {
        "title": req.body.title,
        "authorFirstName": req.body.authorFirstName,
        "authorLastName": req.body.authorLastName,
        "numberOfPages": req.body.numberOfPages,
        "bookId": rand.generate(),
        "onLoan": false

    }

    libraryBooks.push(newBook)
    console.log(libraryBooks);

    res.send("Boken " + req.body.title + " har lagts till i biblioteket.")

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