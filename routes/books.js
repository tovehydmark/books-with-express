//Lista alla böcker som finns i biblioteket
var express = require('express');
const {
    get
} = require('express/lib/response');
var router = express.Router();
var rand = require("random-key")


const fs = require("fs")


//ID in json file are not made up by some generator. Is there any way of using a generator to do that? 

let backToStartPage = "<a href='http://localhost:3000/books/'>Tillbaka till startsidan</a>"



//Gets books from books.json and prints them on page
router.get('/', function (req, res) {

    let allBooks = "<h1>Bibliotekets alla böcker: </h1>"
    let addNewBook = "<a href='http://localhost:3000/books/addbook'>Lägg till en ny bok i systemet</a>"

    fs.readFile("books.json", function (err, data) {
        if (err) {
            console.log(err);
        }

        const books = JSON.parse(data);


        books.forEach(book => {

            let lendingStatus;

            if (book.onLoan == false) {
                lendingStatus = "Boken är tillgänglig"
            } else {
                lendingStatus = "Boken är utlånad"
            }

            allBooks += `
                    <article>
                    <h2>Titel: ${book.title}</h2>
                    <p>Lånestatus: ${lendingStatus}</p>
                    <a href="http://localhost:3000/books/bookinfo/${book.bookId}">Visa mer info om boken</a>
                    </article>`


        });

        res.send(allBooks + addNewBook)

    })

})



//Information on the specific book chosen is shown on separate url
router.get('/bookinfo/:bookid', function (req, res) {

    fs.readFile("books.json", function (err, data) {

        const books = JSON.parse(data);

        let showBook = books.find((book) => book.bookId == req.params.bookid);

        if (!showBook) {
            return res.send("Det finns ingen bok med id " + req.params.bookid)
        }

        let chosenBook = `
        <h2>Titel: ${showBook.title}</h2>
        <p>Författare: ${showBook.authorFirstName + showBook.authorLastName}</p>
        <p>Antal sidor: ${showBook.numberOfPages}</p>
        <p>Utlånad: ${showBook.onLoan}</p>
        <a href="http://localhost:3000/books/lend/${showBook.bookId}">Låna boken</a>`


        res.send(chosenBook + backToStartPage)

    })
})


//Link to lend the book. When clicked, the books status onLoan goes from false to true on start page
router.get('/lend/:bookId', function (req, res) {


    fs.readFile("books.json", function (err, data) {

        if (err) {
            console.log(err);
        }

        const books = JSON.parse(data)

        let showBook = books.find((book) => book.bookId == req.params.bookId);

        if (!showBook) {
            return res.send("Det finns ingen bok med id " + showBook.bookId)
        }

        showBook.onLoan = true;

        //Updates json file so book availability changes
        fs.writeFile("books.json", JSON.stringify(books, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        })

        res.send("Du har nu lånat boken " + showBook.title + backToStartPage)
    })

})


//Create add new book page form
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

    res.send(addBook + backToStartPage)
})




//Add new book with post to json file
router.post('/addbook', function (req, res) {

    fs.readFile("books.json", function (err, data) {
        if (err) {
            console.log(err);
        }

        const books = JSON.parse(data)

        let newBook = {
            "title": req.body.title,
            "authorFirstName": req.body.authorFirstName,
            "authorLastName": req.body.authorLastName,
            "numberOfPages": req.body.numberOfPages,
            "bookId": rand.generate(),
            "onLoan": false

        }

        books.push(newBook)

        fs.writeFile("books.json", JSON.stringify(books, null, 2), function (err) {
            if (err) {
                console.log(err);
            }
        })

        res.send("Boken " + req.body.title + " har lagts till i biblioteket." + backToStartPage)

    })



})



module.exports = router;