const User = require('../models/userModel') ;
const jwt = require('jsonwebtoken') ;
const { expressjwt: expressJwt } = require('express-jwt') ;
const bcrypt = require('bcryptjs')


const JWT_SECRET = "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmF" ;

const singin = (req , res) => {

    User.findOne({email : req.body.email}).then(user => {
        if(!user){
            return res.send({error : "User not exist"})
        }

        bcrypt.compare(req.body.password , user.password , (err , data) => {
            if(err) {
                console.log(err)
                return res.send({error : err})
            }
            
            if (data) {
                // Send JWT
                const token = jwt.sign({_id : user._id} , JWT_SECRET) ;
                res.cookie("t" , token , {
                    expire : new Date() + 9999
                })
                
                res.json({msg : "token succ.." , token , user })
                user.password = undefined ;
                return res.send({
                    token ,
                    user
                })

            } else {
                // response is OutgoingMessage object that server response http request
                return res.json({success: false, error: 'passwords do not match'});
            }

        })
    }).catch(err => console.log(err))
}

const singOut = (req , res) => {
    res.clearCookie("t") ;
    res.json({message : "Deconnecte"})
}


const requireSingin = expressJwt({
    secret : JWT_SECRET ,
    userProperty : "auth" ,
    algorithms : ["HS256"]
})
const hasAuthorization = (req , res , next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id ;

    if (!authorized){
        return res.json({
            error: "Non Authorise"
        })
    }

    next() ;
}

module.exports = {
    singin ,
    singOut ,
    requireSingin ,
    hasAuthorization
}
