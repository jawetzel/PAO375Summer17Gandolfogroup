import request from "request";
import {AccessiVendApiUrl} from "../Sources";



let ListAllUsers = (callback) => {
    GetRequest('Users/listUsers',result => {
        callback(result);
    })
};

let GetUserByName = (name, callback) => {
    PostRequest('Users/getUSerName', name, (result) => {
        callback(result);
    });
};

let GetRequest = (url, callback) => {
    let options = { method: 'GET',
        url: AccessiVendApiUrl + url,
        headers: {  }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
};

let PostRequest = (url, content, callback) => {
    let options = { method: 'POST',
        url: AccessiVendApiUrl + url,
        headers:
            { 'content-type': 'application/json' },
        body: content,
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
};