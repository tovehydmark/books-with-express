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




module.exports = router;