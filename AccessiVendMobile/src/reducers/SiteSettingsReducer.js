import {UpdateSiteSettingsKeyword} from "../actions/index";

let DefaultSiteSettings = {
    LoadingSpinnerActive: false,
    IsLoggedIn: false,
    Username: '',

};

export default function (state = DefaultSiteSettings, action) {
    switch(action.type){
        case UpdateSiteSettingsKeyword:{
            return action.payload;
        }
        default:
            return state;
    }
}