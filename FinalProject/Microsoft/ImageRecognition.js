var request = require('superagent');

var SendImage = function () {
    var { url, params, payload, headers, success, error } = requestConfig();
    request
        .post(url)
        .query(params)
        .send(payload)
        .set(headers)
        .then(success, error);
};

var CheckForPerson = function () {
    SendImage();
};

module.exports = {
    SendImage: SendImage,
    CheckForPerson: CheckForPerson
};

//
//  PRIVATE FUNCTIONS
//
function requestConfig() {
    return {
        url: 'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?',
        payload: { url: getImageUrl() },
        params: {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender",
        },
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'e6af69c32d9f437abb6e90456bf0b068'
        },
        success: success,
        error: error
    };

    function success(data) {
        if (data.body.length > 0) {
            console.log('Face Detected');
        } else {
            console.log('Not Face Detected');
        }
    }

    function error(data) {
        console.log(error);
    }
}

function getImageUrl() {
    var randomIndex = Math.floor(Math.random() * (11 - 0 + 1));        
    var imageUrls = [
        // Faces
        'https://s-media-cache-ak0.pinimg.com/originals/4a/4a/27/4a4a27a61d1ff7ee8ea0e178d05977c6.jpg',
        'https://press.rsna.org/timssnet/media/pressreleases/images/Rybicki2-lg.jpg',
        'https://s-media-cache-ak0.pinimg.com/736x/c7/cf/7b/c7cf7bd36118f8a565f2605e711c9138.jpg',
        'http://www.industrytap.com/wp-content/uploads/2014/04/1020x848xdan2.png.pagespeed.ic.GcWiuWGPbV.jpg',
        'https://s-media-cache-ak0.pinimg.com/originals/09/ec/89/09ec898670da146e5f7519197f9a6f77.jpg',
        'https://images.washingtonpost.com/?url=http://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2014/09/fortyfaces250.gif&w=1484&op=resize&opt=1&filter=antialias',

        // Not Faces
        'https://static.pexels.com/photos/164516/pexels-photo-164516.jpeg',
        'https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi',
        'http://pngimg.com/uploads/apple/apple_PNG12436.png',
        'https://i.ytimg.com/vi/l4WuDjcTqP4/maxresdefault.jpg',
        'https://brightcove.hs.llnwd.net/e1/pd/234507581/234507581_5106927173001_5106903722001-vs.jpg?pubId=234507581&videoId=5106903722001',
        'https://files.allaboutbirds.net/wp-content/themes/html5blank-stable/images/blue-winged-warbler.jpg'
    ];

    return imageUrls[randomIndex];
}




