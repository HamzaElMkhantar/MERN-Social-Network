import postTypes from "../../types/postType";

const inistialState = {
    posts : [] ,
    userPost : [] ,
    postError : null
}

const postReducer = (state = inistialState , action) => {
    switch (action.type) {
        case postTypes.GET_ALL :
            return {
                ...state ,
                posts : action.payload
            } 
        case postTypes.USER_POSTS :
            return {
                ...state ,
                userPost : action.payload
            } 
        case postTypes.ADD_POST :
            return {
                ...state ,
                posts : [action.payload , ...state.posts]
            }
        case postTypes.REMOVE_POST :
            const updatedPosts = state.posts.filter( post => post._id !==  action.payload._id )
            return {
                ...state ,
                posts : updatedPosts
            }
        case postTypes.LIKE_UNLIKE_POST :
            const updatLikePost = state.posts.filter((post) => {
                if(post.postedBy._id === action.userId){
                    post.likes = action.payload.likes ;
                    return state.posts ;
                }
                return state.posts ;
            
            })
            const updatUserLikePost = state.userPost.filter((post) => {
                if(post.postedBy._id === action.userId){
                    post.likes = action.payload.likes ;
                    return state.userPost ;
                }
                return state.userPost ;
            })
            return{
                ...state ,
                posts : updatLikePost ,
                userPost :updatUserLikePost
            }
        case postTypes.ADD_DELETE_CONMMET :
        const updatcommentPost = state.posts.filter((post) => {
            if(post.postedBy._id === action.userId){
                post.comments = action.payload.comments ;
                return state.posts
            }
            return state.posts ;
        })
        const updatUsercommentPost = state.userPost.filter((post) => {
            if(post.postedBy._id === action.userId){
                post.comments = action.payload.comments ;
                return state.userPost
            }
            return state.userPost ;
        })
        return{
            ...state ,
            posts : updatcommentPost ,
            userPost : updatUsercommentPost
        }
        case "post_error" :
            return{
                postError : action.payload
            }
        case "comment_error" :
            return{
                postError : action.payload
            }

        default : return state
    }
}

export default postReducer