
const express=require('express');
const ticketApp=express.Router();

const {bookTicket,updateTicketStatus}=require('../Controllers/ticketControllers');
const expressAsyncHandler = require('express-async-handler');
const verifyToken=require('../Middlewares/verifyToken');
const {isAdmin}=require('../Middlewares/isAdmin')

ticketApp.post('/:moviename/book',verifyToken,expressAsyncHandler(bookTicket));





module.exports=ticketApp