var fs = require('fs');
var mic = require('mic')
var request = require('request');
var uuid = require('node-uuid');

var speechApiAccessToken = '';

var RecordAudio = function(){
    var audio = '';
    var micInstance = mic({
        rate: '16000',
        channels: '1',
        debug: true,
        exitOnSilence: 6
    });
    var micInputStream = micInstance.getAudioStream();

    micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
    });
    micInputStream.on('data', function(data) {
        console.log("Recieved Input Stream: " + data.length);
        audio += data;
    });
    micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete");
        getAuthToken();
    });
    micInstance.start();

};

var getAuthToken = function () {
    var requestData = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': SPEECH_API_KEY
        }
    };
    request.post(requestData, function (error, response, token) {
        if (error) {
            console.error(error);
        } else if (response.statusCode !== 200) {
            console.error(token);
        } else {
            speechApiAccessToken = 'Bearer ' + token;

        }
    });
};
var STT = function (file) {
    var speechApiUrl = [
        'https://speech.platform.bing.com/recognize?scenarios=smd',
        'appid=D4D52672-91D7-4C74-8AD8-42B1D98141A5',
        'locale=en-US',
        'device.os=wp7',
        'version=3.0',
        'format=json',
        'form=BCSSTT',
        'instanceid=0F8EBADC-3DE7-46FB-B11A-1B3C3C4309F5',
        'requestid=' + uuid.v4()
    ].join('&');

    var speechRequestData = {
        url: speechApiUrl,
        headers: {
            'Authorization': speechApiAccessToken,
            'content-type': 'audio/wav; codec=\'audio/pcm\'; samplerate=16000'
        }
    };

    request.post(speechRequestData, function (error, response, body) {
        if (error) {
            reject(error);
        } else if (response.statusCode !== 200) {
            reject(body);
        } else {
            resolve(JSON.parse(body).header.name);
        }
    });
};

module.exports = {
    RecordAudio: RecordAudio
};
