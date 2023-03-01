import { Navigate } from "react-router-dom";
import userTypes from "../../types/userType";

const initialState = {
    currentUser : null ,
    users : [] ,
    userError : null ,
    userSucces : false ,
    deleteUser : false ,
    LogandReg : false ,
    register : false ,
    log : false
}
const userReducer = ( state = initialState  , action) => {
    switch(action.type) {
        case userTypes.GET_USERS :
            return {
                ...state ,
                users : action.payload
            }
        case userTypes.AUTH :
            return {
                ...state ,
                currentUser : action.payload ,
                userSucces : true,
                userError : null ,
                // LogandReg : true ,
                register : false ,
                log : true
            }
        case userTypes.REGISTER :
            return {
                ...state , 
                userSucces : true ,
                register: true ,
                
            }
            case userTypes.CHECK_AUTH :
                return {
                    ...state ,
                    currentUser : action.payload   ,
                    userSucces : true ,
               
                
            }
        case userTypes.SINGOUT :
            localStorage.remove("jwt")
            return {
                ...state ,
                currentUser : null ,
                userSucces : false ,
                LogandReg : false ,
                log : false
            } 
        case userTypes.UPDATE :
            const jwt = JSON.parse(localStorage.getItem("jwt")) ;
            const newJwt = {...jwt , user : action.payload} 
            localStorage.setItem("jwt" , JSON.stringify(newJwt)) ;
            return {
                ...state ,
                currentUser : {...state.currentUser , user : action.payload} ,
                userSucces : true
            }
        case userTypes.DELETE :

                const updatedUsers = state.users.filter(user => user._id !== user.payload.userId)
                
            return {
                ...state ,
                users : updatedUsers ,
                currentUser : null ,
                deleteUser : true ,
                userSucces : false
            }
        case userTypes.FOLLOW :
            return {
                state
            }
        case userTypes.UNFOLLOW :
            return {
                state
            }
        case "USER_ERROR" :
            return {
                ...state ,
                userError : action.payload
            }
        case "TOGGEL_SUCCES" :
            return {
                ...state ,
                userSucces : !state.userSucces
            }

        default :
            return state ;
    }
}

export default userReducer