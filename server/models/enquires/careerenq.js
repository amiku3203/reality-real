const mongoose= require("mongoose");

const careerEnquiry= new mongoose.Schema({
  
 name:{
    type:String, required:true,
 },
 email:{
    type:String, required:true,
 },
 phone:{
    type:String, required:true,
 },
 resume:{
    type:String, required:true,
 },
 jobTitle:{
    type:String, required:true,
 },
 experiencelevel:{
    type:String, required:true,
 }


},{timestamps:true});

const careerEnquiryModel= mongoose.model('Employee',careerEnquiry)

module.exports= careerEnquiryModel;