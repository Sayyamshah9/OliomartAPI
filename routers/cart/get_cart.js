const get_cart_router = require('express').Router()
const cartschema = require('../../dbschemas/cartschema')

get_cart_router.get('/:uid', async(req, res)=>{

    try {
        const getCart = await cartschema.find({cuserId : req.params.uid})
                                        .populate("productId")
        res.json(getCart)                                

    } catch (err) {
        res.json({msg:err})
    }
    
})

module.exports = get_cart_router