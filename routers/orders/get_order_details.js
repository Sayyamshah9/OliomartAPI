const get_orders_router = require('express').Router()
const orderSchema = require('../../dbschemas/orderschema')
const authToken = require('../../validations_and_auths/authentication_token')

get_orders_router.get('/:id', authToken, async(req,res)=>{

    try{
        const getorders = await orderSchema.find({ouserid: req.params.id})
                                           .populate("productid")
        res.json(getorders)
    }catch(err){
        res.json({msg:err})
    }
})

module.exports = get_orders_router