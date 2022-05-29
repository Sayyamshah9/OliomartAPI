const delete_cart_router = require('express').Router()
const cartschema = require('../../dbschemas/cartschema')

delete_cart_router.delete('/:pid', async(req, res) =>{

    try {
        const deleteCart = await cartschema.deleteOne({productId : req.params.pid})
        res.json(deleteCart)

    } catch (err) {
         res.json({msg:err})
    }

})
module.exports = delete_cart_router
