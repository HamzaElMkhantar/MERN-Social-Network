import React, { useEffect, useState } from 'react'
import { useDispatch , connect, useSelector } from 'react-redux'
import { createUser } from '../redux/actions/userAction';
import { Navigate } from 'react-router-dom';
import userTypes from '../redux/types/userType';


export default function Register() {

    const [user , setUser] = useState({
        name : '' ,
        email : '' ,
        password : ''
    })

    const {userError , userSucces} = useSelector(state => state.user)


    const [error , setError] = useState(null) ;
    const [succes , setSucces] = useState(false)
    const dispatch = useDispatch() ;  
    

    useEffect( () => {
        if(userError && userError !== null) {
            setError(userError)
        }
        if(userSucces){
            setSucces(userSucces)
            dispatch({type:"TOGGEL_SUCCES"}) 
        }
    } , [userError , userSucces , dispatch])

    const showError = () => {
        return error && <div className='alert alert-danger'>{error}</div>
    }

    const redirectUser = () => {
        return succes && <Navigate to='/login' />
    }

    const handleInputChange = (e) => {
        setUser({
            ...user ,
            [e.target.name] : e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault() ;

        dispatch(createUser(user))
    }

  return (
    <div style={{marginTop: '100px'}} className='container'>
        <div className='row my-5'>
            <div className='col-md-6 mx-auto'>
            {showError()}
            {redirectUser()}
                <h3 className='card-title text-center my-4'>Register</h3>
                <form onSubmit={handleFormSubmit} className='card p-2'>
                    <div className='form-group pt-4'>
                        <input 
                            type="text" 
                            name="name"
                            placeholder='Full Name'
                            value={user.name}
                            required
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group py-2'>
                        <input 
                            type="email" 
                            name="email"
                            placeholder='Email'
                            value={user.email}
                            required
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group pb-1'>
                        <input 
                            type="password" 
                            name="password"
                            placeholder='Password'
                            value={user.password}
                            required
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group mx-auto mt-3'>
                        <button 
                            onClick={ () => dispatch()}
                            style={ {
                                width : '120px' ,
                                border: '0',
                                height : '35px' ,
                                borderRadius : '4px' ,
                                backgroundColor : '#0D486E' ,
                                color : 'white' } } 
                                type ='submit'
                            className=''>register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

