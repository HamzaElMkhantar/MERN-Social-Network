import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { logOut } from '../hepers/auth'
import AVATAR from '../images/AVATAR.png'
import userTypes from '../redux/types/userType'

function Nabvbar() {

  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;

  const {currentUser } = useSelector(state => state.user)



  const handleLogOut = () => {
    logOut( () => {
      <Navigate to={'/login'} />
      dispatch({
        type : userTypes.SINGOUT
      })
    })
  }

  return (
    <div>
          <nav className="navbar  navbar-expand-lg bg-body-tertiary">
            <div className="container nav-container mx-auto">
              <Link className="navbar-brand" to="/">
                  <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" class="bi bi-twitter logo" viewBox="0 0 15 15">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
              </Link>
               { currentUser ?
                 <ul style={ { width : '100%' , display : 'flex' , justifyContent : 'center' , position : 'absolute'  } } className="">
                  <div className='d-flex'>
                    <li className="nav-item">
                    <Link className="navlink mx-2" aria-current="page" to="/">Accueil</Link>
                    </li>
                    <li className="nav-item mx-2">
                    <Link className="navlink" to="/users">Users</Link>
                    </li>
                  </div>
                </ul> 
                :
                <ul style={ { width : '100%' , display : 'flex' , justifyContent : 'center' , position : 'absolute'  } } className="">
                  <div className='d-flex'>
                    <li className="nav-item">
                    <Link  className="navlink mx-2" aria-current="page" to="/login">LogIn</Link>
                    </li>
                    <li className="nav-item mx-2">
                    <Link className="navlink" to="/register">Register</Link>
                    </li>
                  </div>
                </ul>
              }

              {
                currentUser ?
                <button className='userOption'>
                     <svg xmlns="http://www.w3.org/2000/svg" 
                          width="20" height="16" 
                          fill="currentColor" 
                          class="bi bi-list" 
                          viewBox="0 0 15 15">
                        <path fill-rule="evenodd" 
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                 : ""
              }

                <div style={{ justifyContent : 'space-between' , 
                              alignItems:'center'}} 
                      className='d-flex'>
                 { 
                  
                }
                    {
                      currentUser ? 
                      (<Link className='d-flex justify-content-center align-items-center'  to={currentUser && currentUser.user && `/user/${currentUser.user && currentUser.user._id}`} >
                          <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" 
                              src={currentUser && currentUser.user && `http://localhost:4500/api/user/photo/${currentUser && currentUser.user &&  currentUser.user._id}`} 
                              alt="{user.handle}"/> 
                      </Link>)
                      :
                      null 
                    }
                  
              
                </div>
                
                <ul className='dorpdownList'>
                {
                  !currentUser ? 
                  ''
                  :
                  <div>
                    <li><Link onClick={ () => {
                                handleLogOut() ;
                                
                    }} className="nav-link" to="/login">logOut</Link></li>
                  </div> 
                }
                  
                </ul>
                </div>
                
                </nav>
                </div>
                )
}

export default Nabvbar