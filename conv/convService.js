var request = require('request');

var baseURL = 'http://api.fixer.io/latest';

// Ideally, this would use the callback return the amount of base currency in to currency.
function currencyRequest(callback, amount, base, to) {

    // for (item in base) {
    //     console.log("item = " + item);
    //     console.log("base(item) = " + base[item]);
    // }


    console.log("base.currency = " + base.currency + " base.from_currency = " + base.from_currency + " base.to_currency = " + base.to_currency);

    queryParam = { 'base' : base,  "symbols" : to };

    //Use request module to request picture from APOD service.
    //Must handle result in callback.
    request( {uri :baseURL, qs: queryParam} , function(error, fixer_response, body){

        // console.log("baseURL = " + baseURL);
        // for (item in queryParam) {
        //     console.log("item = " + item + " queryParam[item] = " + queryParam[item]);
        // }

        //console.log(fixer_response);
        //console.log(body);

        if (!error && fixer_response.statusCode == 200){
            console.log("FIXER SAYS \n" + JSON.stringify(body));
            var fixerJSON = JSON.parse(body);   //Convert JSON text to a JavaScript object

            // ok, now process

            // Assume that we can rely on the JSON having this structure
            // Example JSON {"base":"USD","date":"2017-10-20","rates":{"EUR":0.84617}}
            // In a real app, we are likely to be talking to another server under our control so
            // can assume the JSON will be in a specific format

            console.log(fixerJSON);
            var exchangeRate = fixerJSON['rates'][to]
            var totalInToCurrency = exchangeRate * amount;

            // For safety, could also use a try-catch block, and/or check for the data being undefined and callback with an error, e.g.
            // callback(Error('unable to process JSON from fixer'))

            callback(null, totalInToCurrency);
        }

        else {
            //Log error info to console and return error with message.
            console.log("Error in JSON request: " + error);
            console.log(fixer_response);
            console.log(body);
            callback(Error("Error fetching data from the fixer service"));
        }
    });
}


//   Code from routes/index.js copied and pasted here

//
//               function listAllProperties(o) {
//                   var objectToInspect;
//                   var result = [];
//
//                   for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
//                       result = result.concat(Object.getOwnPropertyNames(objectToInspect));
//                   }
//
//                   return result;
//               }
//               conv_data.base = 999;
//               checkThis = listAllProperties(conv_data);
//               console.log("checkThis = " + checkThis);
//
//           //    return res.render('results', { apod : apod_data, title : "APOD for " + apod_data.date });
//               for (item in conv_data) {
//                   console.log("********** item = " + item);
//                   console.log("********** conv_data[item] = " + conv_data[item]);
//               }
//
//
//               var holdObj = conv_data.rates;
//
//               var conversionFactor = 0;
//
//               for (item in holdObj) {
//                   console.log("item = " + item);
//                   console.log("holdObj[item] = " + holdObj[item])
//                   conversionFactor = holdObj[item];
//               }
//
//               if (conversionFactor === 0) {
//                   conversionFactor = 1;
//               }
//
//               // this works... var converted = currency * holdObj.EUR;
//               var converted = currency * conversionFactor;
//
// }


module.exports = currencyRequest;
