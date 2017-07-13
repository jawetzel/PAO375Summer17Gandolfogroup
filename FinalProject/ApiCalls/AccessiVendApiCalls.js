var request = require("request");
var superAgent = require("superagent");
var imageRecognition = require("../Microsoft/ImageRecognition");

var uriBase = 'http://53e4c19b.ngrok.io/api';

var ChargeCustomer = function(body, callback){
    var myBody = { Name: 'Joshua', DrinkType: 'Pepsi' };
    ApiCall(uriBase + '/Users/buyDrink', myBody, function (response) {
        callback(response);
    });
};

var IdentifyUser = function(callback) {
    imageRecognition.GetEncodedImage(function (image) {
        return superAgent.post('https://901ac009.ngrok.io/api/Users/getUserByImage')
                .send(image).end(function(err, res){
                callback(res);
            });
    });
};

var ApiCall = function (url, body, callback) {
    var options = {
        method: 'POST',
        url: url,
        headers:
            { 'content-type': 'application/json' },
        body: body,
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        callback(body);
    });
};



module.exports = {
    ChargeCustomer: ChargeCustomer,
    IdentifyUser: IdentifyUser
};