const mongoose= require("mongoose");


const careerSchema = new mongoose.Schema({
    
    jobtitle:{
         type:String,
         required:true,
    },
    jobdescription:{
         type:String,
         required:true,
    },
    totalposition:{
         type:Number,
         required:true,
    }
  
}, {
    timestamps:true,
})


const jobModel= mongoose.model("JobModel",careerSchema);

module.exports= jobModel;