import userTypes from "../types/userType";
import axios from 'axios' ;
import {isLogged, saveUserToLocalStorage} from '../../hepers/auth'


export const getAllUsers = (token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }

    }
    return dispatch => {
        axios
            .get("http://localhost:4500/api/users")
            .then( res => {
                if(res.data.error){
                    dispatch({
                        type: "USER_ERROR" ,
                        payload : res.data.error
                    })
                }else{
                    dispatch({
                        type : userTypes.GET_USERS ,
                        payload : res.data
                    })
                }
            }).catch(err => console.log(err))
    }
}


export const createUser = (user) => {
    return (dispatch) => {
        axios
            .post("http://localhost:4500/api/users/create" , user)
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type : "USER_ERROR" ,
                        payload : res.data.error
                    })
                }else {
                    dispatch({
                        type: userTypes.REGISTER ,
                        payload : res.data
                    })
                }
            })
            .catch(err => console.log(err)) ;
    }
}

export const login = (user) => {
    return dispatch => {
        axios
            .post("http://localhost:4500/api/auth/singin" , user)
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type : 'USER_ERROR' ,
                        payload : res.data.error
                    })
                }else{
                    saveUserToLocalStorage(res.data)
                    dispatch({
                        type : userTypes.AUTH ,
                        payload : res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }
}

export const authCheck = () => {
    return dispatch => {
        dispatch({
            type : userTypes.CHECK_AUTH ,
            payload : isLogged() ? { user : isLogged() } : null 
        })
    }
}