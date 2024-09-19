//create a route(mini express app)
const exp=require('express')
const movieApp=exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')

const {getAllMovies,getMovieByName,addMovie,deleteMovie,updateTicketStatus}=require('../Controllers/movieController')
const verifyToken=require('../Middlewares/verifyToken')
const isAdmin=require('../Middlewares/isAdmin')



movieApp.get('/all',expressAsyncHandler(getAllMovies))
 
 movieApp.get('/search/:moviename',expressAsyncHandler(getMovieByName))

 movieApp.post('/movie',verifyToken,isAdmin,expressAsyncHandler(addMovie))

movieApp.delete('/:moviename/delete/:id',verifyToken,expressAsyncHandler(deleteMovie));

movieApp.put('/:moviename/update/:ticket',verifyToken,expressAsyncHandler(updateTicketStatus));


 module.exports=movieApp;