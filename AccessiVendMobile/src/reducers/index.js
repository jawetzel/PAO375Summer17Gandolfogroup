import { combineReducers } from "redux";
import SiteSettingsReducer from './SiteSettingsReducer';

const rootReducer = combineReducers({
    SiteSettingsReducer: SiteSettingsReducer,
});
export default rootReducer;