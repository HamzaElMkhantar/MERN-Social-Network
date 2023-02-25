const express = require('express') ;
const {
        createUser , 
        getUser , 
        getUserById, 
        getAllUsers, 
        updateUser , 
        deleteUser, 
        getUserPhoto,
        addFollowers,
        addFollowing,
        removeFollowers,
        removeFollowing
    } = require("../controllers/userController") ; 
const {
        singin  , 
        singOut  , 
        requireSingin , 
        hasAuthorization 
    } = require('../controllers/authController')



const router = express.Router() ;

console.log(singin)
 
// Routes for creating (registering) users and checking if it has already been registered before
router.post("/api/users/create" , createUser ) ;
router.get("/api/user/:userId" , getUser ) ;

// routes for user to singin and Out 
router.post("/api/auth/singin" , singin ) ;
router.get("/api/auth/singout" , singOut ) ;

//  routes for getting , updating or deleting users
router.get("/api/users"  , requireSingin , getAllUsers ) ;
router.put("/api/users/:userId" , requireSingin , hasAuthorization , updateUser ) ;
router.get("/api/user/photo/:userId"  ,  getUserPhoto )
router.delete("/api/users/:userId" , requireSingin , hasAuthorization , deleteUser ) ;

// router for following and followers
router.route("/api/users/add/follow").put( requireSingin , addFollowing , addFollowers ) ;
router.route("/api/users/remove/follow").put( requireSingin , removeFollowing , removeFollowers ) ;



// the getUserById function execute every time passed an id (userId) in other function
router.param("userId" , getUserById ) ;

module.exports = router 