
const Ticket=require('../Models/Ticket');
const Movie=require('../Models/Movie');

const bookTicket=async(req,res)=>{
  console.log(req.body)
    const movieName=req.params.moviename
    const {theatreName,numOfTickets,seatNumber}=req.body

    const movie=await Movie.findOne({movieName:movieName,theatreName:theatreName});
  
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
    if(movie.availableTickets<numOfTickets){
        return res.status(400).send({message:"Not enough tickets available"})
    }

    const ticket=await Ticket.create({movieName,theatreName,numOfTickets,seatNumber});
    movie.availableTickets-=numOfTickets;
    if(movie.availableTickets===0){
        movie.status='SOLD OUT';
    }
    res.status(500).send({message:"Tickets booked successfully",payload:ticket})
}




module.exports={bookTicket}