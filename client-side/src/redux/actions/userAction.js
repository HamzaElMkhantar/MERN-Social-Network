import userTypes from "../types/userType";
import axios from 'axios' ;
import {isLogged, saveUserToLocalStorage} from '../../hepers/auth'
import { useParams } from "react-router-dom";


export const getAllUsers = (token) => {

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }

    }
    return dispatch => {
        axios
            .get("http://localhost:4500/api/users" , config)
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
            payload : isLogged() ? isLogged() : null 
        })
    }
}





export const getUser = (userId , token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }

    }
    return axios
            .get(`http://localhost:4500/api/user/${userId}` , config)
                .then(res => {
                    if(res.data.error){
                        return {error : res.data.error}
                    }else {
                        return {data :res.data}
                    }
                }).catch(err => console.log(err)) ;
    
}

export const subscribe = (followId , userId , token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }

    }
    return axios
            .put(`http://localhost:4500/api/users/add/follow` , {userId , followId} , config )
            .then(res => {
                if(res.data.error){
                    return {error : res.data.error}
                }else{
                    return {data : res.data}
                }
            }).catch(err => console.log(err))
}

export const unSubscibe = (followId , userId , token) => {
    const config = {
        headers : {
            Authorization : `bearer ${token}`
        }
    }

    return axios
            .put(`http://localhost:4500/api/users/remove/follow` , {userId , followId} , config )
            .then(res => {
                if(res.data.error){
                    return{error : res.data.error }
                }else{
                    return {data : res.data }
                }
            }).catch(err => console.log(err))
}

export const updateUser = (user , userId ,token ) => {
    const config = {
        headers : {
            Authorization : `bearer ${token}`
        }
    }
    return (dispatch) => {
        axios
            .put(`http://localhost:4500/api/users/${userId}` , user , config)
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type : "USER_ERROR" ,
                        payload : res.data.error
                    })
                }else {
                    dispatch({
                        type : userTypes.UPDATE ,
                        payload : res.data
                    })
                }
            })
            .catch(err => console.log(err)) ;
    }
}