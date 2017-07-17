var request = require("request");
var superAgent = require("superagent");
var imageRecognition = require("../Microsoft/ImageRecognition");

var uriBase = 'http://0372b6ae.ngrok.io/api';

var ChargeCustomer = function(body, callback){
    ApiCall(uriBase + '/Users/buyDrink', body, function (response) {
        callback(response);
    });
};

var IdentifyUser = function(callback) {
    imageRecognition.GetEncodedImage(function (image) {
        return superAgent.post(uriBase + '/Users/getUserByImage')
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