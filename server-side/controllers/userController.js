const User = require('../models/userModel') ;
const _ = require('lodash') ;
const formidable = require('formidable');
const fs = require('fs') ;
const bcrypt = require('bcryptjs') ;

const createUser =  async (req , res) => { 
    // req.profile = req.body ;
    const {name , email , password} = req.body ;
    
    const exestingUser = await User.findOne({email : req.body.email})
        if(exestingUser) return res.json({error :'email already exist'})

    let hashed_password = null ;
    bcrypt.hash(password , 12 , function(err, hash) {
        // Store hash in your password DB.
        hashed_password = hash ;


                const user = new User({
                    name : name , 
                    email : email ,
                    password : hashed_password
                }) ;
              
                user.save((err , user)=>{
                    if(err){
                        console.log('error : ' + err)
                       return  res.json({error : err}) ;
                    }
                    console.log('user : ' + user)
                    user.password = undefined
                    return res.json(user) ;
          
                })

    });
}

const getUserById = (req , res , next , id) => {

    User.findById(id)
        .populate('following' , "_id name")
        .populate('followers' , "_id name")
        .exec((err , user) => {
            if (err || !user) {
               return res.json({ error: 'User not found' });
            } else {
                req.profile = user;
                next();
            }
        })

}

const getUser = (req , res) => {

    if (req.profile) {    
        req.profile.password = undefined;
       return res.json(req.profile);
    }else {
       return res.json({ error: 'User not found' });
    }
    
}

const getAllUsers = (req , res) => {
    // User.find()
    //     .populate('name about email following followers')
    //     .exec((err , users) => {
    //         err ? res.json({error : err})
    //             : res.json(users)
    //     })


    User.find((err , users) => {
        if(err) return res.json({error : err})
        
        if(!users){
           return res.json({message : "user not found"})
        }else {
            
           return res.json(users)
        }
    }).select("name email about image createdAt following followers")
}

const updateUser = (req , res) => {

    let form = new formidable.IncomingForm() ;
    form.parse(req , (err , fields , files ) => {
        if(err) return res.json({error : "impossible d'ajoute le fichier selectionner"}) ;
        let user = req.profile ;
        user = _.extend(user , fields)
        
        if(files.image){
            user.image.data = fs.readFileSync(files.image.filepath)
            user.image.contentType = files.image.mimetype 
        }

        user.save((err , updatedUser) => {
            if(err) return res.json({error : err})
            updatedUser.password = undefined ;
            updatedUser.image = undefined ;
            return res.json(updatedUser)
        })
    })
}

const deleteUser = (req , res) => {
    let user = req.profile ;
    user.remove((err , deletedUser) => {
        if(err) return res.json({error : err}) ;

        res.json({message : "compte deleted"})
    })
}

const getUserPhoto = (req , res) => {
    if(req.profile.image.data) {
        res.setHeader("Content-Type" , req.profile.image.contentType)
         res.send(req.profile.image.data)

    }else {
         res.sendFile("/Users/hamza/Desktop/All\ Items/MERN-Social-Network/server-side/images/userImg.jpeg") ;
      
    }
}

// following and folloewrs functions

const addFollowing = (req , res , next) => {
    let userId = req.body.userId ;
    let followId = req.body.followId ;
    User.findByIdAndUpdate(
            userId , 
            {$push : {following : followId}} , 
            {new : true} , 
            (err , result) => {
                if(err)  res.json({error : err})

        next();
    })
}

const addFollowers = (req , res) => {
    let userId = req.body.userId ;
    let followId = req.body.followId ;

    User.findByIdAndUpdate( 
            followId , 
            {$push : {followers : userId}} , 
            {new : true}  , 
        )
        .populate("following" , "_id name ")
        .populate("followers" , "_id name ")
        .exec((err , result) => {
            if(err)  res.json({error : err}) ;
            console.log(result)

            // result.password = undefined ;
            // result.image = undefined ;
             res.json(result)
        })
}

const removeFollowing = (req , res , next) => {
    let userId = req.body.userId ;
    let unfollowId = req.body.followId ;
    User.findByIdAndUpdate(
            userId , 
            {$pull : {following : unfollowId}} , 
            {new : true}  , 
            (err , result) => {
                if(err) return res.json({error : err})

        next() ;
    })
}

const removeFollowers = (req , res) => {
    let userId = req.body.userId ;
    let unfollowId = req.body.followId ;

    User.findByIdAndUpdate( 
        unfollowId , 
        {$pull : {followers : userId}} , 
        {new : true}  , 
    )
    .populate("following" , "_id name ")
    .populate("followers" , "_id name ")
    .exec((err , result) => {
        if(err) return res.json({error : err}) ;
        console.log(result)
        // result.password = undefined ;
        // result.image = undefined ;

         res.json(result)
    })
}

module.exports = {
    createUser ,
    getUserById ,
    getUser ,
    updateUser ,
    getAllUsers,
    deleteUser ,
    getUserPhoto ,
    addFollowing ,
    addFollowers ,
    removeFollowers ,
    removeFollowing
}

