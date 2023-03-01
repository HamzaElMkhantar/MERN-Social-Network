import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { checkAuth, isLogged , logOut } from '../hepers/auth'
import { getUser } from '../redux/actions/userAction'
import InputOption from './InputOption'
import ProfileSidebar from './ProfileSidebar'



function Profile() {

  const {userId} = useParams()
  const [error , setError] = useState('')
  const [user , setUser] = useState(null) 
  const [loading , setLoading] = useState(true)

  const jwt = isLogged() ;
  const [following, setFollowing] = useState(false) 

  const{deleteUser} = useSelector(state => state.user)
  
 const navigate = useNavigate()
  
  useEffect( () => {
    async function getProfile(){
      const userData = await getUser(userId , jwt && jwt.token)
      if(userData.error){
        setError(userData.error)
      }else{
        setUser(userData.data)
        setFollowing(checkFollow(userData.data))
      }
    }

    const checkFollow = (user) => {
      const match = user.followers.find(follower => {
          return  follower._id === jwt.user._id
      })
  
      return match ;
    }

    if(loading){

      getProfile() ;
    }

    if(deleteUser){
      logOut( () => {
        return <Navigate to={"/"} />
      })
    }

    return () => {
      setLoading(false)
    }
  } , [userId , navigate , jwt]) ;

  

  const  handleButtonClick = (user) => {
    setUser(user)
    setFollowing(!following)
  }

  const photoIcont = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                      </svg>
  const videoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                          <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                    </svg>

  const eventIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                          <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                    </svg>

  const feedIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg>

  const showError = () => {
  
    return !user ? error && <div style={{width:'100%'}} className='alert px-5 alert-danger mx-auto text-center'>{error}</div> : ''
}




const recentItem = (index , userId , topic) => {
  return(
    <Link key={index} to={`/user/${userId}`}>
       <div   className='sidebar-recentItem d-flex align-items-center'>
            {<img style={{
                        width:'50px' ,
                        height:'50px' ,
                        borderRadius:'50%'
                      }} 
                      className='sidebar-hashtag' 
                      src={`http://localhost:4500/api/user/photo/${userId}?${new Date().getTime()}`} 
                      alt={topic.name} />}
            <p className='sidebar0topic'>{topic && topic.name}</p>
        </div>
    </Link>
  )
}

 const followingList = user ? user.following.map((follow , index) => recentItem(index , follow._id , follow)) : null




 
  return (

    <div style={{marginTop: '90px' , position:'relative'}} 
    className='container' >
        {
          error ? showError() : 
          (
            <div className='user-header-container'>
                <div  className='user-header-image-container'>
                    <img  src={`http://localhost:4500/api/user/photo/${userId}?${new Date().getTime()}`} alt="profile-img" />
                    
                </div>
            <div className='user-header-info-container'>
            <div  className='feedComp'>

            <div className='feed'>
                <div>
                <div className='feed-inputConteiner'>
        
                    <img className='monAvatar' src={`http://localhost:4500/api/user/photo/${userId}`} />
                  
                    <div className='feed-form'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                      </svg>
                        <form>
                            <input style={{borderLeft:'1px solid lightGray' , marginLeft:'10px'}}   placeholder='Post'/>
                            <button className='sendBtnPost' onClick={'sendPost'} name="input" type='submit'>Send</button>
                        </form>
                    </div>
                    
                </div>
                <div className='feed-inputOption'>
                <InputOption Icon={photoIcont} title="Photo" color="#378fe9" />
                <InputOption Icon={videoIcon} title="Video" color="#5f9a41" />
                <InputOption Icon={eventIcon} title="Event" color="#c37d17" />
                <InputOption Icon={feedIcon} title="Write Article" color="#e16744" />
                </div>
        
                </div>
            </div>
        
            </div>
            </div>
            
        </div>)
        }

        {
          <ProfileSidebar 
                handleButtonClick={handleButtonClick}
                userId={userId} 
                user={user && user}
                following={following} />
        }
        <div className='follow-sidebar'>
            <h2>Following</h2>
            <hr />
            <div style={{textAlign:'center' , fontSize:'13px !important' }} className='follow-sidebar-content'>
              {
                followingList && followingList.length  > 0 ? followingList : "there no following " 
              }
          
            </div>
            
        </div>
        
    
    </div>
  )
}

export default Profile