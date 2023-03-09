import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Nabvbar from '../components/Nabvbar'
import PostList from '../components/PostList';
import { isLogged } from '../hepers/auth'
import { getAllPosts } from '../redux/actions/postAction';
import Post from '../components/Post';
import AddPost from '../components/AddPost';

function Home() {

  const jwt = isLogged() ;
  const dispatch = useDispatch() ;

  const {posts} = useSelector(state => state.post) ;

  useEffect( () => {
    const getPosts = () => {
      if(jwt){
        dispatch(getAllPosts(jwt.token ,jwt.user._id))
      }
    }
    getPosts()
  } , [posts])

  console.log(posts)
 
  return (
    <div style={{minHeight:'400px' }} className='home'>
     
      {!jwt ? 
        <div style={{ height:'400px' , width:'100%' }} className=''>
            <div style={{display : 'flex' ,
                          height:'100%' ,
                          width:'100%' ,
                          justifyContent:'center' ,
                          alignItems:"center" ,
                              }} 
                  className=''>
                <Link style={{backgroundColor:'RGB(24 51 79)' ,
                            color :'white'  ,
                            padding:'20px 30px' ,
                            margin :'10px' ,
                            borderRadius:'20px' ,
                          border :'1px solid lightGray'}} 
                      to="/login" >
                   {'Login'}
                </Link>
                <Link style={{backgroundColor:'RGB(24 51 79)' ,
                            color :'white'  ,
                            padding:'20px' ,
                            margin :'10px' , 
                            borderRadius:'20px' ,
                          border :'1px solid lightGray'}} 
                      to="/register" >
                   {'Register'}
                </Link>
                
            </div>
        </div>
       : 
       (
        <div style={{marginTop:'90px'}} className='homeContent container d-flex'>
            <div style={{flex:'0.2'}} className=''>
                
            </div>
            <div style={{flex:'0.6'}} className=''>
                <AddPost />
                <PostList posts={posts && posts} />
            </div>
            <div style={{flex:'0.2'}} className=''>
                  
            </div>
        </div>
       )
      }
     
    <Nabvbar />
    </div>
  )
}

export default Home