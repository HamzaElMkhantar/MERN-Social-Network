import React, { useEffect, useState } from 'react'
import { useDispatch , connect, useSelector } from 'react-redux'
import { login } from '../redux/actions/userAction';
import {  useNavigate } from 'react-router-dom';
import userTypes from '../redux/types/userType';
// import { useHistory } from 'react-router-dom';



export default function Register() {

    const [user , setUser] = useState({
        email : '' ,
        password : ''
    })

    const {userError , userSucces , LogandReg , log} = useSelector(state => state.user)

    const [error , setError] = useState(null) ;
    const [succes , setSucces] = useState(false)



    const dispatch = useDispatch() ;

    console.log(error)
    
    useEffect( () => {
        if(userError && userError !== null) {
            setError(userError)
        }
        if(LogandReg){
            setSucces(log)
            dispatch({ type: userTypes.AUTH })
        }

        // if(error) {

        //     return () => dispatch({type:"HIDE_USER_ERROR"})
        // }
        
    } , [userError , error , LogandReg , dispatch])
    
    const handleInputChange = (e) => {
  
        setUser({
            ...user ,
            [e.target.name] : e.target.value
        })
        dispatch({type:"HIDE_USER_ERROR"})
    }

    const showError = () => {
            return userError && <div className='alert alert-danger text-center'>{error}</div>
    }

    const Navigate = useNavigate()
    const redirectUser = () => {
        return ( log &&
            Navigate('/') )
    }

    console.log(succes)



    const handleFormSubmit = (e) => {
        e.preventDefault() ;

        dispatch(login(user))
        
    }

  return (
    <div style={{marginTop: '100px'}} className='container'>
        <div className='row my-5'>
            <div className='col-md-6 mx-auto'>
            { showError()}
            {redirectUser()}
        
                <h3 className='card-title text-center my-4'>SingIn</h3>
                <form onSubmit={handleFormSubmit} className='card p-2'>
                    <div className='form-group py-2'>
                        <input 
                            type="email" 
                            name="email"
                            placeholder='Email'
                            value={user.email && user.email}
                            required
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group pb-1'>
                        <input 
                            type="password" 
                            name="password"
                            placeholder='Password'
                            value={user.password && user.password}
                            required
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group mx-auto mt-3'>
                        <button
                            // onClick={() => dispatch({type : "HIDE_USER_ERROR"})}
                            style={ {
                                width : '120px' ,
                                border: '0',
                                height : '35px' ,
                                borderRadius : '4px' ,
                                backgroundColor : '#0D486E' ,
                                color : 'white' } } 
                                type ='submit'
                            className=''>logIn</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

