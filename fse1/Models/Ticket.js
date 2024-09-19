const mongoose=require('mongoose')

//create user Schema
const ticketSchema=new mongoose.Schema({
    movieName:{
        type:String,
        required:true
    },
    theatreName:{
        type:String,
        required:true
    },
    numOfTickets:{
        type:Number,
        required:true
    },
    seatNumber:{
        type:String,
        required:true
    },
   
    
})


//create model(class) for that userSchema
const Ticket=mongoose.model('ticket',ticketSchema)

//export user model
module.exports=Ticket;