import React from 'react'
import { subscribe, unSubscibe } from '../redux/actions/userAction'

function FollowButton({
    following , 
    followId ,
    userId ,
    token ,
    handleButtonClick })
    {
        
    const followUser = async () => {
        const userData = await subscribe(followId , userId ,token && token)

        if(userData.error){
            console.log(userData.error)
        }else{
            handleButtonClick(userData.data)
        }
    }
    const unFollowUser = async () => {
        const userData = await unSubscibe(followId , userId ,token && token)

        if(userData.error){
            console.log(userData.error)
        }else{
            handleButtonClick(userData.data)
        }
    }
  return (


    <div s className='followButton'>
        <div>
                {
                    following ?
                    (<button onClick={() => unFollowUser()} className='followingButton'>UnFollow</button>) 
                    : <button onClick={() => followUser()} className='followingButton'>Follow</button>
                }
        </div>
    </div>
  )
}

export default FollowButton