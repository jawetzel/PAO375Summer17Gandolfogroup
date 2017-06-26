var fs = require('fs');
var path = require('path');
var request = require('superagent');
var Camera = require('raspicam');

var camera = new Camera({
    mode: 'photo',
    encoding: 'jpg',
    quality: 10,
    width: 500,
    height: 500,
    output: 'Temp/image.jpg',
    timeout: 1
});

function CheckForUser(resolve, reject) {
    return CaptureImage().then(function () {
        return sendImage();
    });
};

function CaptureImage() {
    return new Promise(function (resolve, reject) {
        setTimeout(reject, 5000);
        camera.on('exit', resolve);
        camera.start();
    });
};

function sendImage() {
    var config = {
        url: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?',
        payload: getBase64EncodedImage(),
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': 'e6af69c32d9f437abb6e90456bf0b068'
        }
    };

    return request
        .post(config.url)
        .send(config.payload)
        .set(config.headers);


    function getBase64EncodedImage() {
        var imagePath = `Temp/image.jpg`;
        var image = fs.readFileSync(imagePath);
        return image;
    }
};

module.exports = { CheckForUser: CheckForUser };






