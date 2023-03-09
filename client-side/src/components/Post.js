import React , {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Form, Link } from 'react-router-dom';
import { isLogged } from '../hepers/auth';
import { addComment, deleteComment, deletePost, likePost , unLikePost} from '../redux/actions/postAction';


function Post({post }) {
    const date = post ? new Date(post.createdAt).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : null;

    const [likes , setLikes] = useState([]) ;
    const [like , setLike] = useState(false) ;
    const [comments , setComments] = useState([]) ;
    const [postId , setPostId] = useState(null)
    const [styleToggle , setStyleToggle] = useState(false) ;
    const [style , setStyle] = useState({}) 
    const [commentText , setcommentText] = useState({
        text : ''
    })



    const jwt = isLogged()
    const dispatch = useDispatch()

    const handleStyle = () => {
        setStyleToggle(!styleToggle) ;
        if(styleToggle){
            setStyle({visibility :'visible' , height :'100%' , display :'block'})
        }else{
            setStyle({})
        }

    }
    
    
    useEffect(() => {
        
        setLikes(post.likes)
        setComments(post.comments)
        
        checkLike(post && post.likes)
        
    } , [post.likes , post.comments , dispatch , jwt , postId , post , post.likes])
    
    console.log(likes)
    const checkLike = (likes) => {
        const match = likes.indexOf(jwt.user._id) !== -1 ;
        setLike(match) ;
    }

    const handleCommentInput = (e) => {
        setcommentText({
            ...commentText ,
            [e.target.name] : e.target.value
        })
    }
    console.log(commentText)
    const handleCommentForm = (e) => {
        e.preventDefault()

        dispatch(addComment(jwt && jwt.token , post && post._id , jwt && jwt.user._id ,commentText && commentText.text))

        setcommentText({
            text : ''
        })
    }

    const heartIcon = <svg style={{color:'RGB(6 87 176)'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart heartSvgIcon mx-2" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
    const unLikeHeartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart heartSvgIcon mx-2" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
    const commentIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-text commentSvgIcon mx-2" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                        </svg>
    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
    const sendIcon = <svg style={{color :''}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
  return (
    <div style={{marginBottom:'10px'}} className='post d-flex mx-auto'>
            <div className='postHeader'>
                <img className='post-img'
                    src={`http://localhost:4500/api/user/photo/${post && post.postedBy && post.postedBy._id}`} />
                    <div style={{width:'100%' , justifyContent:'space-between'}} className='d-flex' >
                    <div className=''>
                        <Link to={`/user/${post && post.postedBy._id}`} className='post-name'>{post && post.postedBy.name || jwt && jwt.user.name}</Link>
                        <p className='post-date' >{post && date}</p>
                    </div>
                    { post.postedBy._id === jwt.user._id ?
                        <button onClick={() => dispatch(deletePost( post && post._id , jwt && jwt.token))}
                            style={{color:'#79031A'}}>
                            delete 
                        </button> : ''
                    }
                    </div>
            </div>
            <div className='postContent'>
                {post && post.text }
            </div>
            <div className='comments-likes'>
                    <div className='like-comment-content'>
                        <div className='like-comment-icons'>
                            <div className='heart-comment-content'>
                                {
                                    !like ?
                                    (
                                    <button onClick={() => dispatch(likePost(jwt.user._id ,jwt.token , post._id))} className='heart-comment'>{unLikeHeartIcon} Like</button>
                                ) :
                                 (
                                    <button onClick={() => {
                                        {
                                            dispatch(unLikePost(jwt.user._id ,jwt.token , post._id))
                                        }
                                    }} className='heart-comment'>{heartIcon} Like</button>
                                 )
                            }
                                <p className='heart-Numbers'>{post && likes.length}</p>
                            </div>
                            <div onClick={() => handleStyle()}
                                className='heart-comment-content comments'>
                                <button className='heart-comment'>{commentIcon } comments</button>
                                <p className='heart-Numbers'>{post && comments.length}</p>
                            </div>
                        </div>
                    </div> 
                    
                    <div style={style} className='comments-text'>
                     <h3 style={{borderBottom:'1px solid lightGray' , padding:'5px 0px'}}>Comments :</h3>
                        <div className='userComentContainer'>
                            {post && post.comments.map((item , index) => (
                                <div key={index} className='userComment' >
                                {console.log(item)}
                                    <div className=''>
                                        <img className='commentFormImg' src={`http://localhost:4500/api/user/photo/${item && item.postedBy._id}?${new Date().getTime()}`} />

                                        <div className='' style={{display:'flex' , flexDirection:'column' , padding:'0px' , margin:'0px' , }}>
                                            <div style={{padding:'0px' , margin : '0px' , fontSize:'18px' , color:'hwb(201 2% 59%)'}} >{item && item.postedBy.name}</div>
                                            <div style={{padding:'0px' , margin : '0px' , color:''}} >{item && item.text}</div>
                                            
                                        </div>
                                    </div>
                                        {
                                            item.postedBy._id === jwt.user._id ?
                                            <button  onClick={() => dispatch(deleteComment(jwt.token ,post._id , item._id))}
                                                     className='comment-deleteBtn'>
                                                delete
                                            </button> : ''
                                        }
                                    </div>
                                    
                                    ) )}
                        </div>
                        <div className='comment_form p-1'>
                            <form onSubmit={handleCommentForm} >
                                <img className='commentFormImg' src={`http://localhost:4500/api/user/photo/${jwt && jwt.user._id }?${new Date().getTime()}`} />
                                <div className='comment-input-container' style={{width:'100%' }}>
                                    <input 
                                        onChange={(e) => {handleCommentInput(e)}}
                                        className='comment_input'
                                        type='text'
                                        required
                                        name='text'
                                        value={commentText.text}
                                        placeholder='Commenter ...'
                                        />
                                </div>
                                <button type='submit' className='deleteComment'>{sendIcon}</button>
                            </form>
                        </div>
                    </div>
            </div>
    </div>
  )
}

export default Post