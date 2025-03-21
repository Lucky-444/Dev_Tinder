 const adminAuth = (req, res,next) =>{
    console.log("admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("You are not authorized");
        return;
    }else{
        next();
    }
};
 const userAuth = (req, res,next) =>{
    console.log("admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("You are not authorized");
        return;
    }else{
        next();
    }
};

module.exports = {adminAuth ,userAuth};