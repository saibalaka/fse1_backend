//create a route(mini express app)
const exp = require('express')
const userApp = exp.Router()

//add express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler')

//import req handlers from Controllers
const { getUsers, createUser, loginUser, resetPassword } = require('../Controllers/userControllers')
const verifyDuplicateUser = require('../Middlewares/verifyDuplicateUser')
const verifyToken = require('../Middlewares/verifyToken')





userApp.get('/users', expressAsyncHandler(getUsers))

userApp.post('/register', verifyDuplicateUser, expressAsyncHandler(createUser))

userApp.post('/login', expressAsyncHandler(loginUser))

userApp.post('/:loginId/forgot', expressAsyncHandler(resetPassword))







module.exports = userApp