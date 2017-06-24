var Gpio = require('pigpio').Gpio;

var gpio4 = new Gpio(4, {mode: Gpio.OUTPUT});
var gpio17 = new Gpio(17, {mode: Gpio.OUTPUT});
var gpio27 = new Gpio(27, {mode: Gpio.OUTPUT});
var gpio22 = new Gpio(22, {mode: Gpio.OUTPUT});
var gpio5 = new Gpio(5, {mode: Gpio.OUTPUT});
var gpio6 = new Gpio(6, {mode: Gpio.OUTPUT});

var ActavatePepsiPin = function(){
    Gpio4Max();
    Gpio17Max();
    setTimeout(function () {
       Gpio4Min();
        Gpio17Min();
    }, 1500);
};

var ActavateMistTwistPin = function(){
    Gpio27Max();
    Gpio22Max();
    setTimeout(function () {
        Gpio27Min();
        Gpio22Min();
    }, 1500);
};

var ActavateMountianDewPin = function(){
    Gpio5Max();
    Gpio6Max();
    setTimeout(function () {
        Gpio5Min();
        Gpio6Min();
    }, 1500);
};

var Gpio4Max = function () {
    gpio4.servoWrite(2000);
};
var Gpio17Max = function () {
    gpio17.servoWrite(2000);
};
var Gpio27Max = function () {
    gpio27.servoWrite(2000);
};
var Gpio22Max = function () {
    gpio22.servoWrite(2000);
};
var Gpio5Max = function () {
    gpio5.servoWrite(2000);
};
var Gpio6Max = function () {
    gpio6.servoWrite(2000);
};


var Gpio4Min = function () {
    gpio4.servoWrite(500);
};
var Gpio17Min = function () {
    gpio17.servoWrite(500);
};
var Gpio27Min = function () {
    gpio27.servoWrite(500);
};
var Gpio22Min = function () {
    gpio22.servoWrite(500);
};
var Gpio5Min = function () {
    gpio5.servoWrite(500);
};
var Gpio6Min = function () {
    gpio6.servoWrite(500);
};

module.exports = {
    ActavatePepsiPin: ActavatePepsiPin,
    ActavateMistTwistPin: ActavateMistTwistPin,
    ActavateMountianDewPin: ActavateMountianDewPin
};