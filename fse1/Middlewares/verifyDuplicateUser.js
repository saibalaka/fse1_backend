const User = require('../Models/User')

async function verifyDuplicateUser(req, res, next) {
    let {email,loginId,password,confirmPassword} = req.body;
    if (password!==confirmPassword){
         return res.send({message:"Passwords don't match"})
    }
    let existingUser = await User.findOne({ $or:[{email},{loginId}] });
    if (existingUser) {
        res.send({ message: "Email or LoginID already exists" })
    }
    else {
        next()
    }
}
module.exports = verifyDuplicateUser