var express = require('express');
var router = express.Router();

var conv = require('../conv/convService');
var symbolToLiteral = require('../conv/symbolToLiteral');

//var exchangerates = require('../model/currencyDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about', { name: 'Jeremy', description: 'Lab7 Node/Express simple currency application.' });
});

/* test gitignore */
router.get('/convert', function(req, res, next) {


    var currency = req.query.currency;   // the amount of currency to convert?
    var toCurrency = req.query.to_currency;
    var fromCurrency = req.query.from_currency;
    var cRate;  // unused?
    var toLiteral;
    var fromLiteral;

    console.log(symbolToLiteral)

    //conv(function(error, fixer_response, body){
    conv(function(err, converted){

        if (err) {
            return res.render('error', {error: error.message, title : "Error"});
        }

        else {
            //var converted = 45454.45;
            res.render('results', {
                currency: currency,   /// e.g. 10
                toCurrency: toCurrency,
                toLiteral: symbolToLiteral[toCurrency],
                fromCurrency: fromCurrency,   // e.g. 'USD'
                fromLiteral: symbolToLiteral[fromCurrency],    // e.g 'US Dollars'
                converted: converted}    // the result
            );

        }

    }, currency  /* e.g. 100 */,  fromCurrency /* e.g. USD */ , toCurrency /* e.g. JPY */);


});


module.exports = router;
