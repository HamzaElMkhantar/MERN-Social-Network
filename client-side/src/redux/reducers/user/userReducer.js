import { Navigate } from "react-router-dom";
import userTypes from "../../types/userType";

const initialState = {
    currentUser : null ,
    users : [] ,
    userError : null ,
    userSucces : false ,
    deletedUser : false ,
    LogandReg : false ,
    register : false ,
    log : false ,
    userUpdate : false
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
                log : true ,
                deleteUser : false
            }
        case userTypes.REGISTER :
            return {
                ...state , 
                userSucces : true ,
                register: true , 
                deleteUser : false ,
                userError : action.payload
                
            }
            case userTypes.CHECK_AUTH :
                return {
                    ...state ,
                    currentUser : action.payload   ,
                    userSucces : true ,
               
                
            }
        case userTypes.SINGOUT :
            localStorage.removeItem("jwt")
            return {
                ...state ,
                currentUser : null ,
                userSucces : false ,
                LogandReg : false ,
                log : false ,
                deletedUser : false
            } 
        case userTypes.UPDATE :
            
            return {
                ...state ,
                currentUser : {...state.currentUser , user : action.payload} ,
                userSucces : true ,
                userUpdate : true ,
                updatFun : () => {
                    const jwt = JSON.parse(localStorage.getItem("jwt")) ;
                    const newJwt = {[jwt.user] : action.payload}
                    jwt = {...jwt , newJwt}
                    localStorage.setItem("jwt" , JSON.stringify(newJwt)) ;
                    state.updatFun()
                }
            }
        case userTypes.DELETE :

                const updatedUsers = state.users.filter(user => user._id !== action.payload.userId)
                
            return {
                ...state ,
                users : updatedUsers ,
                currentUser : null ,
                deletedUser : true ,
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
        case "HIDE_USER_ERROR" :
            return {
                userError : null ,
                updatedUsers : false
            } 
       
        
        case "TOGGEL_SUCCES" :
            return {
                ...state ,
                userSucces : !state.userSucces
            }
        case "restore_info" :
            return {
                userUpdate : false
            }

        default :
            return state ;
    }
}

export default userReducer