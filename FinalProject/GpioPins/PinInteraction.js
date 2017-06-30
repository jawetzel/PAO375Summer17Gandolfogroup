var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 50,
    debug: false
};


var ActavatePepsiPin = function(){
    activatePin(15, 2400, 600);
};

var ActavateMistTwistPin = function(){
    activatePin(14, 2400, 600);

};

var ActavateMountianDewPin = function(){
    activatePin(13, 2400, 600);

};

var activatePin = function (pin, pulseStart, pulseEnd) {
    pwm = new Pca9685Driver(options, function(err) {
        if (err) {
            console.error("Error initializing PCA9685");
            process.exit(-1);
        }
        pwm.setPulseRange(0, 42, 255, function() {
            if (err) {
                console.error("Error setting pulse range.");
            }
        });
        pwm.setPulseLength(pin, pulseStart);
        setTimeout(function () {
            pwm.setPulseLength(pin, pulseEnd);
        }, 2500)
    });
};

module.exports = {
    ActavatePepsiPin: ActavatePepsiPin,
    ActavateMistTwistPin: ActavateMistTwistPin,
    ActavateMountianDewPin: ActavateMountianDewPin
};