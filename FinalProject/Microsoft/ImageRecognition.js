const fs = require('fs');
const path = require('path'); 
const request = require('superagent');
const Camera = require('raspicam');

const camera = new Camera({
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
    return new Promise((resolve, reject) => {
	setTimeout(reject, 5000);
        camera.on('exit', resolve);
        camera.start();
    });
};

function sendImage() {
    const { url, payload, headers } = getRequestConfig();

    return request
        .post(url)
        .send(payload)
        .set(headers);

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

module.exports = { CheckForUser: CheckForUser };






