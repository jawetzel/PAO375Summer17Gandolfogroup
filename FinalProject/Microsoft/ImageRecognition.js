const fs = require('fs');
const path = require('path'); 
const request = require('superagent');
const Camera = require('raspicam');

let camera = new Camera({
    mode: 'photo',
    encoding: 'jpg',
    quality: 10,
    width: 500,
    height: 500,
    output: 'Temp/image.jpg',
    timeout: 1
});

function awaitUser() {
    CaptureImage().then(function () {
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

function CaptureImage() {
    return new Promise((resolve, reject) => {
	setTimeout(reject, 5000);
        camera.on('exit', resolve);
        camera.start();
    });
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
            const images = fs.readdirSync('Temp').filter(file => path.extname(file) === '.jpg');
            const image = getImage();
            return image;

            function getImage() {
                const imagePath = `Temp/image.jpg`;
                const image = fs.readFileSync(imagePath);
                return image;
            }
        }
    }
};

module.exports = { awaitUser: awaitUser };






