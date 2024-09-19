const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    role:{
        type:String
    }
});


const Admin=mongoose.model('admin',adminSchema)

module.exports=Admin;