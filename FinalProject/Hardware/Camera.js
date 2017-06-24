const Raspicam = require('raspicam');

var Camera = function () {
    Camera.prototype = Object.create(Raspicam);
    Camera.prototype.constructor = Camera;
    Camera.prototype.CaptureImage = captureImage;

    function Camera() {
        Raspicam.call(this, {            
            mode: 'photo',
            encoding: 'jpg',
            quality: 10,
            width: 500,
            height: 500,
            output: 'Temp/image.jpg',
            timeout: 1
        });
    }

    function captureImage() {
        return new Promise((resolve, reject) => {
            this.raspicam.on('exit', resolve);
            this.raspicam.start();
        });
    }
    
    return Camera;
};

module.exports = Camera;
