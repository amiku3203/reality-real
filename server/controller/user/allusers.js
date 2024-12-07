const userModel= require("../../models/user/user")

async function allUsers(req,res){
    try{
        
    const allUsers= await userModel.find();

        res.json({
            message : "All Users",
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


module.exports = allUsers;