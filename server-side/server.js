const express = require('express') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const cookieParser = require('cookie-parser') ;
const userRoutes = require("./routes/userRoute") ;
const postRoutes = require('./routes/postRoutes') ;
// const expressJwt = require('express-jwt') ;

const app = express() ;
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = 'mongodb+srv://admin:admin@noteapp.scwbqro.mongodb.net/tweetDB?retryWrites=true&w=majority' ;
const JWT_SECRET = process.env.JWT_SECRET;


// middlewares
app.use(cors()) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended:true})) ;

app.use(cookieParser()) ;

// server port 
const port = PORT|| 4500 ;

//  connect to dataBase
mongoose.connect( DB_URL , {
    useNewUrlParser : true ,
    useUnifiedTopology : true , 
} , (error) => {
    if(error) console.log(error) ;
    console.log("connected to database")
}) ;
mongoose.set('strictQuery', true)

app.use("/" , userRoutes ) ;
app.use('/' , postRoutes ) ;


app.get('/' , (req , res) => {
    res.send('hello') ;
})

app.listen(port , (err) => {
    err ? console.log(err) :
    console.log('server is running at port : ' + port)
}) 