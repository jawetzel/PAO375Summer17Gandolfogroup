var mic = require('mic');
var fs = require('fs');
var uuid = require('node-uuid'),
    request = require('request');
var superagent = require('superagent');
var PinInteraction = require('../GpioPins/PinInteraction');
var Sound = require('node-aplay'); //sudo apt-get install alsa-base alsa-utils

var SpeechToTextEndpoint = 'https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/v1?language=en-US';
var Key = '248162ed0e48475aa055127f1fda4e76';

var AccessToken = '';

var Conversation = function (count, callback) {
    BeginConversation(count, function (intent) {
        console.log(intent);
        switch(intent){
            case 'Error': {
                callback(false);
                break;
            }
            case 'Pepsi': {
                var exitAudio = new Sound('End.wav');
                exitAudio.play();
                console.log('hit pepsi');
                count.Pepsi--;
                PinInteraction.ActavatePepsiPin();
                callback(true);
                break;
            }
            case 'MistTwist': {
                var exitAudio = new Sound('End.wav');
                exitAudio.play();
                console.log('hit mist twist');
                count.MistTwist--;
                PinInteraction.ActavateMistTwistPin();
                callback(true);
                break;
            }
            case 'MountianDew': {
                var exitAudio = new Sound('End.wav');
                exitAudio.play();
                console.log('hit mountian dew');
                count.MountianDew--;
                PinInteraction.ActavateMountianDewPin();
                callback(true);
                break;
            }
            default: {
                var audio = new Sound('error.wav');
                audio.play();
                audio.on('complete', function () {
                    Conversation(count, function (answer) {
                        console.log('answer is: ' + answer);
                        callback(answer);
                    });
                });
                break;
            }
        }
    });
};

var BeginConversation = function (count, callback) {
    var intro;
    console.log(count);
    if(count.Pepsi > 0) {
        if(count.MistTwist > 0){
            if(count.MountianDew > 0){
                intro = new Sound('All3.wav');
            } else {
                intro = new Sound('PepsiAndMist.wav');
            }
        } else if(count.MountianDew > 0){
            intro = new Sound('PepsiAndDew.wav');
        } else {
            intro = new Sound('Pepsi.wav');
        }
    } else if(count.MistTwist > 0){
        if(count.MountianDew > 0){
            intro = new Sound('TwistAndDew.wav');
        } else {
            intro = new Sound('Mist.wav');
        }
    } else if(count.MountianDew > 0){
        intro = new Sound('Dew.wav');
    } else {
        intro = new Sound('NoStock.wav');
        callback = 'Error';
        intro.play();
        callback(false);
        return;
    }
    intro.play();

    intro.on('complete', function () {
        console.log('Done with playback!');
        RecordAudio(function () {
            SendAudioFileToSTT().then(function (text, reject) {
                if(reject){
                    callback('audio fail');
                } else {
                    SendToInterpretation(text.DisplayText, function (intent){
                        callback(intent);
                    });
                }
            });
        });
    });

};

var RecordAudio = function(callback){
    var micInstance = mic({
        rate: '16000',
        channels: '1',
        debug: true,
        exitOnSilence: 6
    });

    var micInputStream = micInstance.getAudioStream();
    var outputFileStream = fs.WriteStream('output.wav');
    micInputStream.pipe(outputFileStream);

    micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
        micInstance.stop();
        setTimeout(function () {
            callback();
        }, 200);
    });

    micInstance.start();
};

var FetchToken = function () {
    var AuthApiEndpoimt = 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken';
    var options = {
        url: AuthApiEndpoimt,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': Key
        }
    };

    request.post(options, function (err, res, body) {
        var TimeoutTime = 1000;
        if(err){
            console.log(err);
            TimeoutTime = 3000;
        } else {
            AccessToken = 'Bearer ' + body;
            TimeoutTime = 500000;
        }
        setTimeout(function(){
            console.log('Updating Speech Token');
            FetchToken();
        }, TimeoutTime);

    })
};

var SendAudioFileToSTT = function () {
    return new Promise(
        function (resolve, reject) {
            StreamToText(resolve, reject);
        }
    );
};

var StreamToText = function (resolve, reject) {
    var options = {
        url: SpeechToTextEndpoint,
        headers: {
            'Accept': 'application/json;text/xml',
            'Content-Type': 'audio/wav; codec="audio/pcm"; samplerate=16000',
            'Authorization': AccessToken,
            'requestid': uuid.v4(),
            'locale': 'en-US'
        }
    };

    fs.createReadStream('output.wav').pipe(request.post(options, function (error, response, body) {
        fs.unlink('output.wav', function (err) {
            if(err){
                console.log(err);
            }
        });
        if (error) {
            reject(error);
        } else if (response.statusCode !== 200) {
            reject(body);
        } else {
            resolve(JSON.parse(body).RecognitionStatus === 'Success' ? JSON.parse(body) : {DisplayText: 'failed'});
        }
    }));
};

var SendToInterpretation = function (queery, callback) {
    var baseurl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c6a3f914-106d-41c3-b7cd-fffbef6e13b8?subscription-key=5fe2ec884d9d4c09a3acb4085ab6ea17&verbose=true&timezoneOffset=0&q=';
    var convertedQueery = queery.split(' ').join('_');

    var url = baseurl + convertedQueery;

    superagent.get(url).end(function (err, res) {
        callback(res.body.intents['0'].intent);
    })
};

module.exports = {
    Conversation: Conversation,
    FetchToken: FetchToken
};