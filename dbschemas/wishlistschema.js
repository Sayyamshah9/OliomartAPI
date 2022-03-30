const mongoose = require('mongoose')
const productdata = require('./productschema')

const wishlistschema = mongoose.Schema({

    wuserid : String,
    wproductid : {
         type : mongoose.Schema.Types.ObjectId,
         ref : productdata
    }

})
module.exports = mongoose.model('wishlistdata' , wishlistschema)