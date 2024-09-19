function isAdmin(req,res,next){
   
    if(req.user.role==="admin"){
      next()
    }
    else{
        res.status(403).send({message:"Access Denied...Admins Only!!"})
    }
  }

  module.exports=isAdmin