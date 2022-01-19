const get_orders_router = require('express').Router()
const orderSchema = require('../../dbschemas/orderschema')

get_orders_router.get('/:id', async(req,res)=>{

    try{
        const getorders = await orderSchema.find({ouserid: req.params.id})
        res.json(getorders)
    }catch(err){
        res.json({msg:err})
    }
})

module.exports = get_orders_router