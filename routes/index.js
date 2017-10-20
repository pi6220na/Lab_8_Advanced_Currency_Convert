var express = require('express');
var router = express.Router();

var conv = require('../conv/convService');

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


    var currency = req.query.currency;
    var toCurrency = req.query.to_currency;
    var fromCurrency = req.query.from_currency;
    var cRate;
    var toLiteral;
    var fromLiteral;

    //conv(function(error, fixer_response, body){
    conv(function(err, conv_data){

        if (err) {
            return res.render('error', {error: error.message, title : "Error"});
        }

        else {


            function listAllProperties(o) {
                var objectToInspect;
                var result = [];

                for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
                    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
                }

                return result;
            }
            conv_data.base = 999;
            checkThis = listAllProperties(conv_data);
            console.log("checkThis = " + checkThis);





        //    return res.render('results', { apod : apod_data, title : "APOD for " + apod_data.date });
            for (item in conv_data) {
                console.log("********** item = " + item);
                console.log("********** conv_data[item] = " + conv_data[item]);
            }


            //   balance of convert code goes here ????



            if (fromCurrency === "EUR" && toCurrency === "USD") {
                cRate = "EtD";
                fromLiteral = "Euros";
                toLiteral = "Dollars";
            } else
            if (fromCurrency === "EUR" && toCurrency === "JPY") {
                cRate = "EtY";
                fromLiteral = "Euros";
                toLiteral = "Yen";
            } else
            if (fromCurrency === "EUR" && toCurrency === "EUR") {
                cRate = "EtE";
                fromLiteral = "Euros";
                toLiteral = "Euros";
            } else
            if (fromCurrency === "USD" && toCurrency === "USD") {
                cRate = "DtD";
                fromLiteral = "Dollars";
                toLiteral = "Dollars";
            } else
            if (fromCurrency === "USD" && toCurrency === "JPY") {
                cRate = "DtY";
                fromLiteral = "Dollars";
                toLiteral = "Yen";
            } else
            if (fromCurrency === "USD" && toCurrency === "EUR") {
                cRate = "DtE";
                fromLiteral = "Dollars";
                toLiteral = "Euro";
            } else
            if (fromCurrency === "JPY" && toCurrency === "USD") {
                cRate = "YtD";
                fromLiteral = "Yen";
                toLiteral = "Dollars";
            } else
            if (fromCurrency === "JPY" && toCurrency === "JPY") {
                cRate = "YtY";
                fromLiteral = "Yen";
                toLiteral = "Yen";
            } else
            if (fromCurrency === "JPY" && toCurrency === "EUR") {
                cRate = "YtE";
                fromLiteral = "Yen";
                toLiteral = "Euro";
            }


            //console.log('dollars = ' + dollars);
            //console.log('toCurrency = ' + toCurrency);

            //var converted = currency * exchangerates[cRate];

            //var converted = currency * res.to;

            //var converted = currency * res.rates.eur;
            var holdObj = conv_data.rates;

            var conversionFactor = 0;

            for (item in holdObj) {
                console.log("item = " + item);
                console.log("holdObj[item] = " + holdObj[item])
                conversionFactor = holdObj[item];
            }

            if (conversionFactor === 0) {
                conversionFactor = 1;
            }

            // this works... var converted = currency * holdObj.EUR;
            var converted = currency * conversionFactor;

            //var converted = 45454.45;

            res.render('results', {
                currency: currency,
                toCurrency: toCurrency,
                toLiteral: toLiteral,
                fromCurrency: fromCurrency,
                fromLiteral: fromLiteral,
                converted: converted}
            );

        }

    }, req.query);


});


module.exports = router;
