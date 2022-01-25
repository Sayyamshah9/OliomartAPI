const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    otp:Number,
    isOtpVerified: Boolean,
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
    role:  String, // buyer, seller, admin
    //for seller
    sellerid: String,
    adharphoto: String,
    adharname: String,
    adharnumber: String,
    sellerverify: Boolean   // false(default)/(true-verified)
})

module.exports = mongoose.model('userdata', userschema)