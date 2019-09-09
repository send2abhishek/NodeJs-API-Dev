const jwt=require('jsonwebtoken');

module.exports= (req,res,next) =>{

    try{
        const token=req.headers['authorization'].split(" ")[1];
        //console.log("Input token",token)
        const decode=jwt.verify(token,'secret');
        //console.log("User Data token -",decode);
        req.userData=decode;
        next();
    }
    catch(error){

        return res.status(401).json({

            message: "UnAuthorize ",
            errorMsg: "Invalid token or you are missing header token"
        });

    }

    
}