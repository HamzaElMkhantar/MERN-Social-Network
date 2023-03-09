import axios from "axios";
import postTypes from "../types/postType";

export const getAllPosts = (token , userId) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
            .get(`http://localhost:4500/api/posts/${userId}` , config)
            .then(res => {
                if(res.data.error){
                    console.log(res.data.error)
                    dispatch({type :'post_error' ,
                              payload : res.data.error })
                }else{
                    dispatch({
                        type : postTypes.GET_ALL ,
                        payload : res.data
                    })
                }
            }).catch(err => console.log(err))
    }
}

export const userPosts = (token , userId) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
            .get(`http://localhost:4500/api/posts/by/${userId}` , config)
            .then(res => {
                if(res.data.error){
                    console.log(res.data.error)
                    dispatch({type :'post_error' ,
                              payload : res.data.error })
                }else{
                    dispatch({
                        type : postTypes.USER_POSTS ,
                        payload : res.data
                    })
                }
            }).catch(err => console.log(err))
    }
}

export const addPost = (userId , token , post) => {
    console.log(post)
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
            .post(`http://localhost:4500/api/post/create/${userId}`,  post , config )
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type : "POST_ERROR" ,
                        payload : res.data.error 
                    })
                }else{
                    console.log(res.data)
                    dispatch({
                        type : postTypes.ADD_POST ,
                        payload : res.data
                    })
                }
            }).catch(err => console.log(err))
    }
}

export const likePost = (userId , token , postId) => {
    console.log(userId , postId)
    const config = {
        headers : {
            Autorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
            .put(`http://localhost:4500/api/post/like` , { postId , userId } , config )
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type:'POST_ERROR' ,
                        payload : res.data.error
                    })
                }else{
                    console.log('posrlike :' + res.data)
                    dispatch({
                        type : postTypes.LIKE_UNLIKE_POST ,
                        payload : res.data
                    })
                }
            })
    }
}

export const unLikePost = (userId , token , postId) => {
    const config = {
        headers : {
            Autorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
            .put(`http://localhost:4500/api/post/unlike` , { postId , userId } , config)
            .then(res => {
                if(res.data.error){
                    dispatch({
                        type:'POST_ERROR' ,
                        payload : res.data.error
                    })
                }else{
                    dispatch({
                        type : postTypes.LIKE_UNLIKE_POST ,
                        payload : res.data ,
                        userId
                    })
                }
            })
    }

}

export const deletePost = (postId , token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
        .delete(`http://localhost:4500/api/post/${postId}` , config)
        .then(res => {
            console.log(res.data.error)
            if(res.data.error){
                dispatch({
                    type: "post_error" ,
                    payload : res.data.error
                })
            }else {
                console.log(res.data)
                dispatch({
                    type:postTypes.REMOVE_POST ,
                    payload :res.data
                })
            }
        })
    }
}

export const addComment = (token , postId , userId , text) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
                .put(`http://localhost:4500/api/post/comment` , {postId , userId , text} , config)
                .then(res => {
                    if(res.data.error){
                        dispatch({
                            type : 'comment_error' ,
                            payload : res.data.error
                        })
                    }else{
                        dispatch({
                            type : postTypes.ADD_DELETE_CONMMET ,
                            payload : res.data ,
                            userId
                        })
                    }
                })
    }
}

export const deleteComment = (token , postId , commentId ) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    return dispatch => {
        axios
                .put(`http://localhost:4500/api/post/uncomment` , {postId , commentId} , config)
                .then(res => {
                    if(res.data.error){
                        dispatch({
                            type : 'comment_error' ,
                            payload : res.data.error
                        })
                    }else{
                        dispatch({
                            type : postTypes.ADD_DELETE_CONMMET ,
                            payload : res.data 
                        })
                    }
                }).catch(err => console.log(err))
    }
}