const userModel= require("../../models/user/user")

async function  userDetails(req,res){
    console.log("userDetails Hello!")
    const userId = req.userId;
    console.log("usrr",userId)
    try{
        
    const allUsers= await userModel.findById(userId);

        res.json({
            message : "User Details",
            error : false,
            success : true,
            data : allUsers
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports =  userDetails;