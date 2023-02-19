const express = require('express') ;
const {getAllPosts , addPost, userPosts, isOwner, deletePost, getPostbyId, unLikePost, likePost, addComment, deleteComment} = require('../controllers/postController')
const {requireSingin} = require('../controllers/authController') ;
const {getUserById} = require('../controllers/userController')

const router = express.Router() ;

router.get('/api/posts/:userId' , requireSingin , getAllPosts) ;
router.get('/api/posts/by/:userId' , requireSingin  , userPosts)
router.delete('/api/post/:postId' , requireSingin , isOwner , deletePost)
router.post('/api/post/create/:userId' , requireSingin , addPost) ;
router.put('/api/post/unlike' , requireSingin , unLikePost ) ;
router.put('/api/post/like' , requireSingin , likePost ) ;
router.put('/api/post/comment' , requireSingin , addComment ) ;
router.put('/api/post/uncomment' , requireSingin , deleteComment ) ;

router.param("userId" , getUserById)
router.param('postId' , getPostbyId)

module.exports = router ;