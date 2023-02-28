import userTypes from "../../types/userType";

const initialState = {
    currentUser : null ,
    users : [] ,
    userError : null ,
    userSucces : false
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
                userError : null
            }
        case userTypes.REGISTER :
            return {
                ...state , 
                userSucces : true
            }
        case userTypes.CHECK_AUTH :
            return {
                ...state ,
                currentUser : action.payload   ,
                userSucces : true
            }
        case userTypes.SINGOUT :
            return {
                ...state ,
                currentUser : null ,
                userSucces : false
            } 
        case userTypes.UPDATE :
            const jwt = JSON.parse(localStorage.getItem("jwt")) ;
            const newJwt = {...jwt , user : action.payload} 
            localStorage.setItem("jwt" , JSON.stringify(newJwt)) ;
            return {
                ...state ,
                currentUser : {...state.currentUser , user : action.payload} ,
                // userSucces : true
            }
        case userTypes.DELETE :
                const updatedUsers = state.users.filter(user => user._id !== user.payload._id)
            return {
                ...state ,
                users : updatedUsers
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