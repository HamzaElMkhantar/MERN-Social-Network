import userTypes from "../types/userType";
import axios from 'axios' ;
 
export const createUser = (user) => {
    return dispatch => {
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
                console.log(res.data)
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
                    dispatch({
                        type : userTypes.AUTH ,
                        payload : res.data 
                    })
                }
            })
            .catch(err => console.log(err))
    }
}