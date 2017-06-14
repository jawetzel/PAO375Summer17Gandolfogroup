var request = require('superagent');
var fs = require('fs');
var path = require('path');

module.exports = {
    CheckForPerson: checkForPerson
};

function checkForPerson() {
    sendImage(resolve, reject);

    function resolve(response) {
        var userPresent = response.body.length > 0;
        console.log(`${userPresent ? '' : 'No '}User Detected`);
    }

    function reject(response) {
        console.log(response);
    }
};

function sendImage (resolve, reject) {
    var { url, params, payload, headers } = getRequestConfig();

    request
        .post(url)
        .query(params)
        .send(payload)
        .set(headers)
        .then(resolve, reject);

    function getRequestConfig() {
        return {
            url: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?',
            payload: fs.readFileSync(getImage()),
            params: {
                "returnFaceId": "true",
                "returnFaceLandmarks": "false",
                "returnFaceAttributes": "age,gender",
            },
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': 'e6af69c32d9f437abb6e90456bf0b068'
            }
        };

        function getImage() {        
            var images = fs.readdirSync('temp').filter(file => path.extname(file) === '.jpg');
            var randomIndex = Math.floor(Math.random() * (images.length));
            return `temp/${images[randomIndex]}`;
        }
    }
};








