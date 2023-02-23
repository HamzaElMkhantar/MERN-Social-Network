import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions/userAction';
import AVATAR from '../images/AVATAR.png'
import { isLogged } from '../hepers/auth';
import { Link } from 'react-router-dom';

function Users() {

  const [error , setError] = useState() ;

  const {users , userError  } = useSelector(state => state.user)
  const dispatch = useDispatch() ;

// const jwt = isLogged() ;

// console.log(jwt.token)

  useEffect( () => {
    if(userError && userError !== null){
      setError(userError)
    }

    dispatch(getAllUsers())
  } , [dispatch])
  


  const showError = () => {
    return error && <div className='alert alert-danger'>{error.message}</div>
  }

  return (
    <div className='container profiles-list'>
      <div className='row my-4'>
        <div className='col-md-8 mx-auto' >
        {showError()}
          <div className='card'>
            <div className='card-header bg-light'>
                <h3 className='card-title text-center'>Profiles</h3>
            </div>
            <div  className='card-body'>
              <ul className='listGroup'>
                {
                  users.length === 0 ?
                  "Loading..." :
                  
                  users.map((user , index) => (
                    <li className='listGroupItem'>
                        <Link to={`/user/${user._id}`} >
                            <div className='listGroupItemContent'>
                            <div className='imageList'>
                                <img className='img'  
                                    src={`http://localhost:4500/api/user/photo/${user._id}`} />
                            </div>
                                <div className='listGroupItemContent-item'>

                                    <h2 >
                                        {user.name}
                                    </h2>
                                    <svg  xmlns="http://www.w3.org/2000/svg" 
                                          width="60" height="35" 
                                          fill="currentColor" class="bi bi-arrow-right-circle-fill" 
                                          viewBox="0 0 16 16">

                                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                    </svg>

                                </div>

                            </div>
                        </Link>
                    </li>)
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users ;