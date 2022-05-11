var express = require('express');
const app = require('../app');
var router = express.Router();

//VARFÖR GENERERAS DET UNDER ÄVEN NÄR DET ÄR UTKOMMENTERAT??//

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Biblioteket'
  });
});


//Lista alla böcker som finns i biblioteket
//På root-sidan ska alla böcker visas med namn + utlånestatus (true/false) + länk till sidan "lägg till en ny bok"


//visa info om en specifik bok
//På böckernas infosida: namn, författare, antal sidor + utlånestatus + länk för att låna boken

//låna en bok (via en get route)

//lägga till en ny bok (via en post)
//Formulär via vilket vi kan lägga till en ny bok i biblioteket (dvs pusha till vår globala variabel i detta fallet)


//Hantera böckerna med en global array i books.js








module.exports = router;