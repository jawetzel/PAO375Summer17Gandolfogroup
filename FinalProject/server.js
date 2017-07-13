var PinAccess = require('./GpioPins/PinInteraction');
var Speech = require('./Microsoft/Speech');
var APIService = require('./ApiCalls/AccessiVendApiCalls');
Speech.FetchToken();

ApiCalls.ChargeCustomer('hel;p', function (response) {
    console.log(response);
});

var Count = {
    Pepsi: 3,
    MistTwist: 3,
    MountianDew: 3
};

var loopCheck = function () {  //main loop
    APIService.IdentifyUser().then(resolve, reject);

    function resolve(response) {
        var userDetected = response.body.userDetected;
        if (userDetected) {
            Speech.Conversation(Count, function (callback) {
                console.log('Success = ' + callback);
                setTimeout(function () {
                    loopCheck();
                }, 5000);
            });
        } else {
            setTimeout(function () {
                loopCheck();
            }, 3000);
        }
    }

    function reject() {
        console.log('API Request Failed');
    }
};
//loopCheck();




// just speech for demo below //
var justSpeech = function () {
    Speech.Conversation(Count, function (callback) {
        console.log('Success = ' + callback);
        setTimeout(function () {
            justSpeech();
        }, 5000);
    });
};

//justSpeech(); //startup




// just speech for demo above //

// below is a pin demo //
var pepsi = function () {
    console.log('run pepsi');
    PinAccess.ActavatePepsiPin();
    setTimeout(function () {
        dew();
    },5000);
};

var mist = function () {
    console.log('run Mist');
    PinAccess.ActavateMistTwistPin();
    setTimeout(function () {
        pepsi();
    },5000);
};

var dew = function () {
    console.log('run Dew');
    PinAccess.ActavateMountianDewPin();
    setTimeout(function () {
        mist();
    },5000);
};
//pepsi();

// above is a pin demo //






// to get this working you need nodeJs(https://nodejs.org/en/)

// to run project go to directory and in the console do the following:
// npm install
// gulp

// to add packages you want do the following:
// npm install --save [Name] ( ex: npm install --save superagent )


//superagent Example for get request:
/*
 var superagent = require('superagent');
 var url = "https://698d3691-3163-466b-bb68-2af7d89fa992:Aw7o8TrpAx@twcservice.mybluemix.net/api/weather/v1/geocode/" + req.latitude + "/" + req.longitude + "/observations.json?units=m&language=en-US";

 superagent.get(url).then(function(result){
 callback(result);
 })
 */


// superagent example post:
/*
 var superagent = require('superagent');

 uperAgent.post(Url)
 .send({message: endResponse.handledIntent.cleanResponse, voice: voice, responseFormat: returnAudioType })
 .then(function (res, err) {
 console.log(res);
 }

 */
