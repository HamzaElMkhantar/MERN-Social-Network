import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export const saveUserToLocalStorage = (jwt) => {
    localStorage.setItem('jwt' , JSON.stringify(jwt)) ;
}

export const isLogged = () => {
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt')) ;
    }else {
        return false ;
    }
}


export const logOut = (cb) => {
    localStorage.removeItem('jwt') ;
    document.cookie = "t=;expires=thu, 01 Jan 1900 00:00:00 UTC;path=/" ;
    cb() ;
}

export const checkAuth = (userId) => {
    console.log(isLogged().user._id)
    return isLogged().user._id === userId ; 
}