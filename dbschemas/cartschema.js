const mongoose = require('mongoose')
const productdata = require('./productschema')

const cartschema = mongoose.Schema({

    cuserId: String,
    productId : {

              type : mongoose.Schema.Types.ObjectId,
              ref : productdata
    }


})
module.exports = mongoose.model('cartdata', cartschema)