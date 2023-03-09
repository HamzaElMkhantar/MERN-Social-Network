const  Post = require('../models/postModel') ;

const getAllPosts = (req , res) => {
    let following = req.profile.following ;
    // following.push(rea.profile._id)
    // {postedBy : {$in : req.profile.following}}
    Post.find()
        .populate('comments' , 'text created')
        .populate("comments.postedBy" , '_id name')
        .populate("postedBy" , '_id name')
        .sort('-createdAt')
        .exec((err , posts) => {
            if(err){
               return res.json({Error : err})
            }

             res.json(posts) ;
        })
}

const userPosts = (req , res) => {
    Post.find({postedBy : req.profile._id})
        .populate("comments" , "text created")
        .populate("comments.postedBy" , "_id name")
        .populate("postedBy" , "_id name")
        .sort("-createdAt")
        .exec((err , posts) => {
            // err ? res.json({error : err})
            // :  res.json(posts) ;
            if(err){
                res.json({error : err})
            }

            res.json(posts)
        })
}

const getPostbyId = (req , res , next , id) => {
    Post.findById(id)
        .populate("comments" , "text created")
        .populate("comments.postedBy" , "_id name")
        .populate("postedBy" , "_id name")
        .exec( (err , post) => {
            err ? res.json({error : err})
            : req.post = post ;

            next() ;
        })
}

const isOwner = (req , res , next) => {
    let isMine = req.post && req.auth && req.post.postedBy._id == req.auth._id ;

    if(!isMine){
        return res.json({error : "non authorise"}) ;
    }

    next() ;
}

const addPost = (req , res) => {
    const {text} = req.body ;
    const post = new Post({
        text ,
        postedBy : req.profile._id
    })
    post.save((err , data) => {
        if(err){
            res.json({error : err}) ;
        }
        console.log(data)
        res.send(data)
    }) ;
}

const deletePost = (req , res) => { 
    let postToDelete = req.post ;
    postToDelete.remove( (err , postDeleted) => {
        err ? res.json({error : err})
            : res.json(postDeleted) ;
    })
    // let postId = req.body.postId ;
    // Post.findByIdAndRemove(postId , (error , res) => {
    //         if(error){
    //             return res.json({error : err})
    //         }else{
    //             res.json({message:'post deleted' + res})
    //         }
    // })
}

const likePost =  (req , res) => {
    let postId = req.body.postId
    let userId = req.body.userId
    Post.findByIdAndUpdate(
            postId , 
            {$push : {likes : userId} } , 
            {new : true}
                ).exec( (err , newPost) => {
                err ? res.json({error : err})
                    : res.json(newPost) ;
        })
}

const unLikePost = (req , res) => {
    Post.findByIdAndUpdate( 
        req.body.postId , 
        {$pull : {likes : req.body.userId}}, 
        {new : true}
        ).exec( (err , newPost) => {
            err ? res.json({error : err})
                : res.json(newPost) ;
        })
}

const addComment = (req , res) => {
    let comments = {text : req.body.text} ;
    comments.postedBy = req.body.userId ;
    let postId = req.body.postId

    Post.findByIdAndUpdate(
            postId ,
            {$push : {comments : comments}} ,
            {new : true})
        .exec( (err , comment) => {
            if(err) return res.json({error : err}) ;

            res.json(comment) ;
        })
}

const deleteComment = (req , res) => {
    let commentId = req.body.commentId
    Post.findByIdAndUpdate(req.body.postId , {$pull : { comments : {_id : commentId} }} , {new : true})
        .exec( (err , comment) => {
            if(err) return res.json({error : err}) ;

            res.json(comment) ;
        })
}

module.exports = {
    getAllPosts ,
    addPost ,
    userPosts ,
    getPostbyId ,
    isOwner ,
    deletePost ,
    likePost ,
    unLikePost ,
    addComment ,
    deleteComment
}

