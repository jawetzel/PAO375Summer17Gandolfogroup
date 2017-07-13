var fs = require('fs');
var path = require('path');
var Camera = require('raspicam');
var superAgent = require('superagent');

var camera = new Camera({
    mode: 'photo',
    encoding: 'jpg',
    quality: 10,
    width: 500,
    height: 500,
    output: 'Temp/image.jpg',
    timeout: 1
});


function GetEncodedImage(callback) {
    CaptureImage().then(function () {
        callback(EncodeImage().match(new RegExp('.{1,2000}', 'g')));
    });
}

function CaptureImage() {
    return new Promise(function (resolve, reject) {
        setTimeout(reject, 5000);
        camera.on('exit', resolve);
        camera.start();
    });
}

function EncodeImage() {
    var imagePath = `Temp/image.jpg`;
    var bitmap = fs.readFileSync(imagePath);
    var buffer = new Buffer(bitmap);
    var encodedImage = buffer.toString('base64');

    return JSON.stringify(encodedImage);
}

module.exports = { GetEncodedImage: GetEncodedImage };






