const mongoose= require("mongoose");

const testimonialsSchema= new mongoose.Schema({
  name:{type:String,required:true},
  designation:{type:String,required:true},
  ratings:{type:Number,required:true},
  description:{type:String,required:true},

},{
  timestamps:true
})

const testiModel= mongoose.model('test',testimonialsSchema);


module.exports=testiModel;