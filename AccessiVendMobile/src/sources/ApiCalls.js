import superagent from 'superagent';

const apiUrl = 'http://accessivendapi.azurewebsites.net/api/';

export function LoginCall(account, callback) {
    superagent.post(apiUrl + 'Admin/login')
        .send(account).end((err, res) => {
        if(err){
            console.log(err);
        } else {
            callback(res);
        }
    })
}

export function GetPurchaces(callback) {
    superagent.get(apiUrl + 'Drink/listAllDrinkOrders').end((err, res) => {
       if(err){
           console.log(err);
       } else {
           callback(res.body);
       }
    });
}