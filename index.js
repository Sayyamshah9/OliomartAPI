//IMPORTING LIBRARIES
const express = require('express')
const app = express()
require('dotenv').config({path:"./configurations/.env"})
// const cors = require('cors')

//IMPORTING OTHER ROUTES/FUNCTION/FILES
const DBIsConnected = require('./configurations/dbconnect')

//MIDDLEWARE
app.use(express.json())
// app.use(cors())
app.use('/imgs', express.static('./images/adharcard')) //making images folder public so that we can access it.
app.use('/pimgs', express.static('./images/products'))

//ROUTES
//user-routes
app.use('/newbuyer', require('./routers/user/new_buyer'))
app.use('/getuser', require('./routers/user/get_user_route'))
app.use('/passreset', require('./routers/user/password_reset'))
app.use('/deleteuser', require('./routers/user/delete_user'))
app.use('/newseller', require('./routers/user/new_seller'))

//product-routes
app.use('/newproduct', require('./routers/products/upload_product'))

//TRIAL GET REQUEST
app.get('/', (req, res) => {
    res.send("Working")
})

//DEFINING PORT
const port = process.env.PORT || 3000

//LISTINING TO PORT
app.listen(port, ()=>{
    console.log("Server is Up and Running")
})

//CONNECTING TO DATABASE
DBIsConnected()
