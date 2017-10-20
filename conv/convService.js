var request = require('request');

var baseURL = 'http://api.fixer.io/latest';

function currencyRequest(callback, base, to) {


    for (item in base) {
        console.log("item = " + item);
        console.log("base(item) = " + base[item]);
    }


    console.log("base.currency = " + base.currency + " base.from_currency = " + base.from_currency + "base.to_currency = " + base.to_currency);


    queryParam = { 'base' : base.from_currency,  "symbols" : base.to_currency };

    //Use request module to request picture from APOD service.
    //Must handle result in callback.
    request( {uri :baseURL, qs: queryParam} , function(error, fixer_response, body){

        console.log("baseURL = " + baseURL);
        for (item in queryParam) {
            console.log("item = " + item + " queryParam[item] = " + queryParam[item]);
        }

        //console.log(fixer_response);
        //console.log(body);

        if (!error && fixer_response.statusCode == 200){
            console.log("FIXER SAYS \n" + JSON.stringify(body));
            var fixerJSON = JSON.parse(body);   //Convert JSON text to a JavaScript object
            callback(null, fixerJSON);
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

module.exports = currencyRequest;

