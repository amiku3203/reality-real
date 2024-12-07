const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    number:String,
    password : String,
    role : String,
     

},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel