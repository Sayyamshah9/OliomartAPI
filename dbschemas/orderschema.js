const mongoose = require('mongoose')

const newOrder = mongoose.Schema({

    // ouserid: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'productdata'
    // }
    ouserid: String,
    productid: [String],
    oquantity: [Number],
    oprice: [Number],
    ototalprice: Number,
    osize: String,
    ocolors: String,
    dstatus: Boolean,
    pfeedback: String

})


module.exports = mongoose.model('ordersdata', newOrder)