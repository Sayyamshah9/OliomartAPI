const get_product_router = require('express').Router()
const productSchema = require('../../dbschemas/productschema')

get_product_router.get('/:productId', async(req,res)=>{

    const productDetails = await productSchema.findById(req.params.productId)
    res.status(200).json(productDetails)

})

module.exports = get_product_router
