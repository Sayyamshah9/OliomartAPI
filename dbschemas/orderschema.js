const mongoose = require('mongoose')
const productdata = require('./productschema')

const newOrder = mongoose.Schema({

    // ouserid: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'productdata'
    // }
    ouserid: String,
    productid: {
        type : mongoose.Schema.Types.ObjectId,
        ref : productdata
    }, //remove array populate-frome productschema
    oquantity: Number, //remove array
    oprice: Number, //remove array
    ototalprice: Number,
    osize: String, //remove array
    ocolors: String, //remove array
    dstatus: Boolean, 
    pfeedback: String

})


module.exports = mongoose.model('ordersdata', newOrder)