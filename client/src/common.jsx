const backendDomin = "http://localhost:8000"
 
const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/v1/user/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/v1/user/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/v1/user/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/v1/user/logout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/v1/user/allusers`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/v1/user/updateuser`,
        method : "post"
    },
    
}


export default SummaryApi