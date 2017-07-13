var request = require("request");
var superagent = require("superagent");
var imageRecognition = require("./Microsoft/ImageRecognition");

var ChargeCustomer = function(body, callback){
    var myBody = { Name: 'Joshua', DrinkType: 'Pepsi' };
    ApiCall('http://localhost:58976/api/Users/buyDrink', myBody, function (response) {
        callback(response);
    });
};

var IdentifyUser = function() {
    return superAgent.post('http://localhost:58976/api/Users/detectAndIdentifyUser')
        .send(imageRecognition.GetEncodedImage())
        .set('accept', 'application/json');
}

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
    ChargeCustomer: ChargeCustomer
};