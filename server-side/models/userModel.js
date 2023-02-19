const mongoose = require('mongoose') ;

const {ObjectId} = mongoose.Schema ;

const UserSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true ,
        required : true ,
    } ,
    about : {
        type : String ,
        trim : true
    } ,
    image : {
        data : Buffer ,
        contentType : String
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true
    } ,
   
    password: String ,
    following : [{type : ObjectId , ref : "User"}] ,
    followers : [{type : ObjectId , ref : "User"}]
} , {
    timestamps : true 
})


module.exports = mongoose.model("User" , UserSchema) 