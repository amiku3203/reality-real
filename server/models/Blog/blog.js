const mongoose= require("mongoose");
const slugify = require("slugify");
const blogSchema= new mongoose.Schema({
   title:{
      type:String, required:true
   } ,
   shortDescription:{
    type:String, required:true
   },
   cateogory:[{
      type:String,required:true
   }],
   blogthumbnail:{
     url:{
        type:String, required:true
     }
   },
   author:{
    type:String, required:true
   }
  ,
  slug:{
    type:String,  
  },
  description:{
    type:String, required:true
  },
  metattile:{
    type:String, required:true
  },
  metadescription:{
    type:String, required:true
  },
  metakeywords:{
    type:String, required:true
  }


},{timestamps:true});



 blogSchema.pre("save", function (next) {
    if (this.isModified("title")) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });
  
const blogModel= mongoose.model('Blog', blogSchema);

module.exports=blogModel;