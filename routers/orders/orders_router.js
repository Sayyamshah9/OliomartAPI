const new_order_router = require('express').Router()
const orderSchema = require('../../dbschemas/orderschema')

new_order_router.post('/:id', async(req,res) => {


    let lengthOfArray = req.body.oquantity
    let priceArray = []
    for (let i = 0; i < lengthOfArray.length; i++) {
        var p = req.body.oprice[i] * req.body.oquantity[i];
        priceArray.push(p)
    }
    
    const newOrder = new orderSchema({

        ouserid: req.params.id,
        productid: req.body.productid,
        oquantity: req.body.oquantity,
        oprice: req.body.oprice,
        ototalprice: priceArray.reduce((prevIndex, currentIndex) => prevIndex + currentIndex),
        osize: req.body.osize,
        ocolors: req.body.ocolors,
        dstatus: false,
        pfeedback: req.body.pfeedback

    })

    try{
        const order = await newOrder.save()
        res.json({msg:"Order Placed"})
    }catch(err){
        res.json({msg:err})
    }

})

module.exports = new_order_router