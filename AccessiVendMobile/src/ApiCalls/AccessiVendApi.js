import superAgent from 'superagent';
import { AccessiVendApiUrl } from "../Sources";
import { GetEncodedImage } from './Microsoft/ImageRecognition';

export function LoginAdmin (info){
    return superAgent.post( AccessiVendApiUrl + 'Admin/login')
        .send({Params: info}) // Body of request
        .set('accept', 'application/json');
}
export function ListAllUsers(){
    return superAgent.get( AccessiVendApiUrl + 'Users/listUsers');
}

export function GetUserByName (name){
    return superAgent.post( AccessiVendApiUrl + 'Users/getUSerName')
        .send({Params: name}) // Body of request
        .set('accept', 'application/json');
}

export function IdentifyUser() {
    return superAgent.post(AccessiVendApiUrl + 'Users/detectAndIdentifyUser')
        .send(GetEncodedImage())
        .set('accept', 'application/json');
}