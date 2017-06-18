var PinAccess = require('./GpioPins/PinInteraction');
var ImageRecognition = require('./Microsoft/ImageRecognition');
var Speech = require('./Microsoft/Speech');

Speech.FetchToken();


var loopCheck = function(){
    setTimeout(function(){
        console.log('checking');
        loopCheck();
    }, 3000);
};
setTimeout(function(){
    console.log('going to record audio');

    Speech.RecordAudio(function (answer) {
        Speech.SendToInterpretation(answer, function (convAnswer) {
            console.log(convAnswer);
            //handle intent
        });
    });
}, 3000);


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
