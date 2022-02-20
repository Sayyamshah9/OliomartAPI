const mongoose = require('mongoose')
const userschema = require('./userschema')

// const imgArray = new mongoose.Schema({
//         pimg1: {type:String},
//         pimg1: {type:String},
//         pimg1: {type:String}
// })

const productschema = mongoose.Schema({

    puserid: {type:String, ref:userschema},
    pname: String,
    pdescription: String,
    pcategory: String,
    psubcategory: String,
    qty: Number,
    price: Number,
    pimages: [String],
    pweight: Number,
    manufacturedate: String,
    expirydate: String,
    veg: Boolean,
    pcolor: [String],
    psize: [String],
    pkeywords: [String],
    pverify: Boolean

})

module.exports = mongoose.model('productdata', productschema)