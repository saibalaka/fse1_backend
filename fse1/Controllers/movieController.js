const Movie = require('../Models/Movie')

const kafka = require('kafka-node');
// Creating a client and producer
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new kafka.Producer(client);


const getAllMovies = async (req, res) => {
    const movies=await Movie.find({})
    res.status(200).send({message:"Fetched all movies",payload:movies})
    
}

const getMovieByName = async (req, res) => {
    const {moviename}=req.params;
    const movies=await Movie.find({movieName:new RegExp(moviename,'i')});
    if(movies.length===0){
        return res.status(404).send({message:"Movie not found"})
    }
    res.status(200).send({message:"All Movies",payload:movies})
}

const addMovie=async(req,res)=>{
  let {movieName,theatreName,totalTickets}= req.body;
  let data={
    movieName:movieName,
    theatreName:theatreName,
    totalTickets:totalTickets,
    availableTickets:totalTickets,
  }
  const newMovie=await Movie.create(data);
  res.status(201).send({message:"movie added successfully",payload:newMovie})
}

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
    console.error('Error in Kafka producer:', err);
});

const deleteMovie=async(req,res)=>{
    const{moviename,id}=req.params;
    const movie=await Movie.findOneAndDelete({movieName:moviename,_id:id});
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
// Produce a Kafka message about the deletion
 const payloads = [
    {
        topic: 'deletedTopic',
        messages: JSON.stringify({ movieName: movie.movieName, theatreName: movie.theatreName, id: movie._id }),
        partition: 0
    }
];
producer.send(payloads, (err, data) => {
    if (err) {
        console.error('Error sending message to Kafka:', err);
        return res.status(500).json({ message: 'Error deleting movie' ,err});
    }
    console.log('Message sent to Kafka:', data);
});
// return success response
return ({ message: 'Movie deleted successfully', movie });
} 

const updateTicketStatus=async(req,res)=>{
    const moviename=req.params.moviename;
    const ticket=req.params.ticket
    
    const movie=await Movie.findOne({movieName:moviename});
    if(!movie){
        return res.status(404).send({message:"Movie not found"})
    }
    movie.availableTickets-=ticket;
    movie.availableTickets=movie.availableTickets<=0?movie.status='SOLD OUT':movie.status='BOOK ASAP'
   
    await Movie.updateOne({movieName:moviename},movie)
    res.status(200).send({message:"Ticket status updated successfully",movie});

}



module.exports = { getAllMovies,getMovieByName ,addMovie,deleteMovie,updateTicketStatus}