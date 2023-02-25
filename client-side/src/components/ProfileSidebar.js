import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkAuth, isLogged } from '../hepers/auth';
import FollowButton from './FollowButton';


function ProfileSidebar({user , userId , following , handleButtonClick}) {

    const recentItem = (topic) => {
        return(
            <div className='sidebar-recentItem'>
                <span className='sidebar-hashtag'>#</span>
                <p className='sidebar0topic'>{topic}</p>
            </div>
        )
    }

    const formattedDate = user ? new Date(user.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : null;
    
    const jwt = isLogged()

    
  return (

    <div className='sidebar'>
    {checkAuth(userId) ?
        (<div style={{justifyContent:'space-around' , marginBottom:'10px'}} className='d-flex'>
                <button style={{backgroundColor:'RGB(19 , 151 , 0 , 0.5)' , 
                                borderRadius:'5px' , 
                                padding:'1px 10px' , 
                                marginLeft:'5px' }}  className=''>edite</button>
                <button style={{backgroundColor:'RGB(136 ,28 ,21, 0.5)' , 
                borderRadius:'5px' , 
                padding:'1px 10px' , 
                marginLeft:'5px' }} >delete</button>
        </div>) : <FollowButton 
                        handleButtonClick={handleButtonClick}
                        following={following} 
                        userId={jwt && jwt.user._id} 
                        token={jwt && jwt.token}  
                        followId={user && user._id} />
    }
        <div className='sidebar-top pt-1'>
        <Link to={`/user/${user && user._id}`} >
            <h2>{user && user.name}</h2>
        </Link>
            <h4>{user && user.email}</h4>

            <div style={{marginTop:'8px'}} className='sidebar-top-stats'>
                <div className='stat'>
                    <h4>Followers</h4>
                    <p>{user && user.followers.length}</p>
                </div>
                <div className='stat'>
                    <h4>Following</h4>
                    <p>{user && user.following.length}</p>
                </div>
            </div>
            <span style={{color:'gray' , fontSize:'11px'}} className='text-center'> Created At : {user && formattedDate } </span>
        </div>
        <div className='sidebar-buttom'>
            <h2>Hashtag ternds</h2>
            <div>
            {recentItem("react js")}
            {recentItem("Programming")}
            {recentItem("Redux")}
            {recentItem("Software Engineer")}
            {recentItem("react js")}
            </div>
            
        </div>
    </div>
  )
}

export default ProfileSidebar