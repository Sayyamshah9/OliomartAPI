const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    confirmpassword: String,
    gender: String,
    address: String,
    city: String,
    state: String,
    userpincode: String,
    usertype:  Boolean, // true(default)/(false - Seller)
    //if buyer is false
    sellerid: String,
    adharphoto: String,
    adharname: String,
    adharnumber: String,
    sellerverify: Boolean   // false(default)/(true-verified)
})

module.exports = mongoose.model('userdata', userschema)