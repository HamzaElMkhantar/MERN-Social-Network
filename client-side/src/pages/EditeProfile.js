import React, { useCallback, useEffect, useState , memo} from 'react'
import { useDispatch , useSelector } from 'react-redux'
// import { createUser } from '../redux/actions/userAction';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { checkAuth, isLogged } from '../hepers/auth';
import { getUser, updateUser } from '../redux/actions/userAction';
import userTypes from '../redux/types/userType';


const  EditeProfile = () =>  {

    const {userId} = useParams() ;

    const [user , setUser] = useState({
        name : '' ,
        email : '' ,
        password : '' ,
        about : '' ,
        image : ''
    })

   

    const [error , setError] = useState(null) ;
    const [succes , setSucces] = useState(false)
    const [loading , setLoading] = useState(true)
    const dispatch = useDispatch() ;  
    
    const jwt = isLogged() ;

    const {userError , userSucces , userUpdate} = useSelector(state => state.user)
    
    var navigate = useNavigate()

    

    useEffect(() => {
        const getProfile = async () => {
          if (jwt && userId) {
            const { error, data } = await getUser(userId, jwt.token);
            if (error) {
              setError(error);
            } else if (data) {
              setUser(data);
            //   setSucces(true);
            }
          }
        };
      
        if(loading){
            getProfile();
        }
        return () => {
            setLoading(false)
        }
      }, [userId]);

    useEffect( () => {
        
        if(error){
            setError(userError)
            
        }
        
        if(!checkAuth(userId)){
            navigate(`/user/${user && userId}`) 
        }
        
        
    } , [  userUpdate , user , navigate , dispatch])
    
    if(userUpdate){
        
        navigate(`/user/${user && userId}`)
        // dispatch({type:"TOGGEL_SUCCES"})
    }
    
    // const redirectUser = () => {
        
        // }
            // if(userUpdate){
            //     navigate(`/user/${jwt && jwt.user._id}`)
            // }
    // redirectUser()

    // console.log(userUpdate)
    // const redirectUser = useCallback(() => {
    //     if (succes) {
    //       navigate(`/user/${user && user._id}`);
    //     }
    //   }, [succes, user, navigate]);
    
  
    

    const handleInputChange = (e) => {
        const value = e.target.name === "image"
                        ? e.target.files[0] : e.target.value
        setUser({
            ...user ,
            [e.target.name] : value
        })
    }


    const handleFormSubmit =
        (e) => {
          e.preventDefault();
          const userData = new FormData();
          user.name && userData.append('name', user.name);
          user.email && userData.append('email', user.email);
        //   user.password && userData.append('password', user.password);
          user.about && userData.append('about', user.about);
          user.image && userData.append('image', user.image);
          dispatch(updateUser(userData, userId, jwt && jwt.token));

        //   dispatch({type: userTypes.UPDATE})
          
        }

    

  return (
    <div style={{paddingTop: '40px'}} className='container'>
        <div className='row my-5'>
            <div className='col-md-6 mx-auto'>
         
           

                <h3 className='card-title text-center my-4'>Update Profile</h3>
                <form onSubmit={handleFormSubmit} className='card p-2'>

                    <div style={{width:'200px' , height:'200px'}} className='mx-auto form-group my-2'>
                        <img 
                            style={{width:'100%' , height:'100%'}}
                            alt={user && user.name}
                            src={`http://localhost:4500/api/user/photo/${userId}?${new Date().getTime()}`} />
                    </div>
                    <div className='form-group py-1'>
                        <input 
                            type="text" 
                            name="name"
                            placeholder='Full Name'
                            value={user.name}
                            
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                    <div className='form-group py-2'>
                        <input 
                            type="email" 
                            name="email"
                            placeholder='Email'
                            value={user.email}
                            
                            onChange={e => handleInputChange(e)}
                            className="form-control"   />
                    </div>
                   {
                    //  <div className='form-group pb-1'>
                    //     <input 
                    //         type="password" 
                    //         name="password"
                    //         placeholder='Password'
                    //         value={user.password || ""}
                    //         required
                    //         onChange={e => handleInputChange(e)}
                    //         className="form-control"   />
                    // </div>
                }
                    <div className='form-group pb-1'>
                        <textarea
                            style={{height:'150px'}}
                            type="text" 
                            name="about"
                            placeholder='Bio'
                            value={user.about}
                            
                            onChange={e => handleInputChange(e)}
                            className="form-control" 
                        ></textarea>
                        
                    </div>
                    <div style={{width:'250px'}} className='mx-auto form-group pb-1'>
                        <input 
                            type="file" 
                            name="image"
                            accept='image/*'
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
                            className=''>Update</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditeProfile ;