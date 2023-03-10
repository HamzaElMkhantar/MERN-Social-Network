
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { checkAuth, isLogged, logOut } from '../hepers/auth';
import { deleteUser } from '../redux/actions/userAction';
import userTypes from '../redux/types/userType';
import FollowButton from './FollowButton';


function ProfileSidebar({user , userId , following , handleButtonClick }) {

    const {deletedUser} = useSelector(state => state.user)
    const formattedDate = user ? new Date(user.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : null;
    const jwt = isLogged()

    const recentItem = (id , topic) => {
        return(
          <Link key={id} to={`/user/${id}`}>
             <div   className='sidebar-recentItem d-flex align-items-center'>
                  {<img style={{
                    width:'50px' ,
                    height:'50px' ,
                    borderRadius:'50%'
                  }} className='sidebar-hashtag' src={`http://localhost:4500/api/user/photo/${id}`} alt={topic.name} />}
                  <p className='sidebar0topic'>{topic.name}</p>
              </div>
          </Link>
        )
      }

      
      const followersList = user ? user.followers.map(follow => recentItem(follow._id , follow)) : null
   

      const dispatch = useDispatch()

      const navigate = useNavigate()
      console.log(deletedUser)
    //   useEffect( () => {
    //       if(deletedUser){
                // dispatch({
                //     type : userTypes.SINGOUT
                // })
    //       }
    //       console.log(deletedUser)

    //         dispatch(deletedUser(user && userId , jwt && jwt.token))
    // } , [ dispatch , Navigate , deletedUser])

    const handleDelete = () => {
        dispatch(deleteUser(user && userId , jwt && jwt.token))
        if(deleteUser){
            logOut(() => {
              navigate('/login')
              })   
        }
        dispatch({
            type : userTypes.SINGOUT
        })

    }


  return (

    <div className='sidebar pr-2'>
    {checkAuth(userId) ?
        (<div style={{justifyContent:'space-around' , marginBottom:'10px'}} className='d-flex'>
            <Link to={`/edite/${userId}`} >
                <button style={{backgroundColor:'RGB(19 , 151 , 0 , 0.5)' , 
                                borderRadius:'5px' , 
                                padding:'1px 10px' , 
                                marginLeft:'5px' }}  className=''>edite</button>
            </Link>

                <button
                        onClick={() => { handleDelete()}
                              
                        }
                        style={
                            {backgroundColor:'RGB(136 ,28 ,21, 0.5)' , 
                            borderRadius:'5px' , 
                            padding:'1px 10px' , 
                            marginLeft:'5px' }} 
                >delete</button>
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
            <p style={{fontSize:'12px'}} className="mt-2" >{user && user.about}</p>

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
            <span style={{color:'gray' , fontSize:'11px'}} className='text-center'> Created At : {user && formattedDate} </span>
        </div>
        <div className='sidebar-buttom'>
            <h2>Followers</h2>
            <div style={{fontSize:'10px' , textAlign:'center'}}>
                    {
                        followersList &&  followersList.length  > 0 ? followersList : "there no followers" 

                    }
            </div>
            
        </div>
    </div>
  )
}

export default ProfileSidebar