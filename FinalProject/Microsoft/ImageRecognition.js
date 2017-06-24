const fs = require('fs');
const path = require('path'); 
const request = require('superagent');
const Camera = require('../Hardware/Camera');

let camera = new Camera();
let userPresent = false;

function awaitUser() {
    camera.CaptureImage().then(function (resolve, reject) {
        sendImage(resolve, reject);
    });

    function resolve(response) {
        const userPresent = response.body.length > 0;
        console.log(`${userPresent ? '' : 'No '}User Detected`);
    }

    function reject(response) {
        console.log(response);
    }
};

function sendImage (resolve, reject) {
    const { url, payload, headers } = getRequestConfig();

    request
        .post(url)
        .send(payload)
        .set(headers)
        .then(resolve, reject);

    function getRequestConfig() {
        return {
            url: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?',
            payload: getBase64EncodedImage(),
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': 'e6af69c32d9f437abb6e90456bf0b068'
            }
        };

        function getBase64EncodedImage() {
            const images = fs.readdirSync('temp').filter(file => path.extname(file) === '.jpg');
            const image = getRandomImage();
            return image;

            function getRandomImage() {
                const randomIndex = Math.floor(Math.random() * images.length);
                const imagePath = `temp/${images[randomIndex]}`;
                const image = fs.readFileSync(imagePath);
                return image;
            }
        }
    }
};

module.exports = awaitUser;






