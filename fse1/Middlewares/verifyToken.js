const jwt=require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req,res,next){
    //token verification logic
     //get bearer token from header of req obj
     const bearerToken=req.headers.authorization;
     //extract token from string
     if(bearerToken){
        const token=bearerToken.split(' ')[1]
        //verify the token
        const decodedToken=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decodedToken
        
        next() 
    }  
    else{
        res.status(403).send({message:"Unauthorised access"})
    }
}



module.exports=verifyToken