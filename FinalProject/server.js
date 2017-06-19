var PinAccess = require('./GpioPins/PinInteraction');
var ImageRecognition = require('./Microsoft/ImageRecognition');
var Speech = require('./Microsoft/Speech');

//var Gpio = require('onoff').Gpio,
//    led = new Gpio(3, 'out');

//led.write(1, function (hello) {
//    console.log(hello);
//}); // 1 = on, 0 = off :)
//setTimeout(function () {
//
//}, 2000);
Speech.FetchToken();


var loopCheck = function(){
    setTimeout(function(){
        console.log('checking');
        loopCheck();
    }, 3000);
};


//example of how to call the speech stuff
/*
setTimeout(function(){
    Speech.RecordAudio(function (answer) {
        if(answer.length !== 0){
            Speech.SendToInterpretation(answer, function (convAnswer) {
                switch(convAnswer){
                    case 'Pepsi': {
                        console.log('hit pepsi');
                        break;
                    }
                    case 'MistTwist': {
                        console.log('hit mist twist');
                        break;
                    }
                    case 'MountianDew': {
                        console.log('hit mountian dew');
                        break;
                    }
                    default:{
                        break;
                    }
                }
            });
        } else {
            //repeat record, no words found in audio file
        }
    });
}, 3000);*/


//loopCheck();


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
