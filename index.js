//IMPORTING LIBRARIES
const express = require('express')
const app = express()
require('dotenv').config({path:"./configurations/.env"})
const cors = require('cors')

//IMPORTING OTHER ROUTES/FUNCTION/FILES
const DBIsConnected = require('./configurations/dbconnect')

//MIDDLEWARE
app.use(express.json())
app.use(cors())
app.use('/imgs', express.static('./images/adharcard')) //making images folder public so that we can access it.
app.use('/pimgs', express.static('./images/products'))

//ROUTES
//user-routes
app.use('/newbuyer', require('./routers/user/new_buyer'))
app.use('/getuser', require('./routers/user/get_user_route'))
app.use('/passreset', require('./routers/user/password_reset'))
app.use('/deleteuser', require('./routers/user/delete_user'))
app.use('/newseller', require('./routers/user/new_seller'))
app.use('/sendotp', require('./routers/user/send_email_otp'))

//product-routes
app.use('/newproduct', require('./routers/products/upload_product'))
app.use('/getproducts', require('./routers/products/get_random_products'))
app.use('/getproductdetails', require('./routers/products/get_product')) 

//order-routes
app.use('/neworder', require('./routers/orders/orders_router'))
app.use('/getordersdetails', require('./routers/orders/get_order_details'))

//cart-routes
app.use('/addtocart', require('./routers/cart/add_cart'))
app.use('/getcartdetails' , require('./routers/cart/get_cart'))
app.use('/deletecart', require('./routers/cart/delete_cart'))

//wishlist-routes
app.use('/addtowishlist', require('./routers/wishlist/add_wishlist'))
app.use('/getwishlist', require('./routers/wishlist/get_wishlist'))
app.use('/deletewishlist', require('./routers/wishlist/delete_wishlist'))

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
