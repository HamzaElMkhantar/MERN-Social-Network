import { combineReducers } from "redux" ;
import postReducer from "./post/postReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
    user : userReducer ,
    post : postReducer
}) ;

export default rootReducer