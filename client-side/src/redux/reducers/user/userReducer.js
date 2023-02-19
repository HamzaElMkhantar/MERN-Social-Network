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
                users : action.payload
            }
        case userTypes.REGISTER :
            return {
                ...state ,
                userSucces : !state.userSucces 
            }
        case userTypes.CHECK_AUTH :
            return {
                ...state ,
                users : action.payload
            }
        case userTypes.SINGOUT :
            return {
                ...state ,
                users : action.payload
            } 
        case userTypes.UPDATE :
            return {
                state 
            }
        case userTypes.DELETE :
                const updatedUsers = state.users.filter(user => user._id !== user.payload.id)
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