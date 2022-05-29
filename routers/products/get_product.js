const get_product_router = require('express').Router()
const productSchema = require('../../dbschemas/productschema')

get_product_router.get('/:productId', async(req,res)=>{

    const productDetails = await productSchema.findById(req.params.productId)
    if(productDetails != 0){
        res.status(200).json(productDetails)
    }else{
        res.status(400).json({msg:"not Found"})
    }

})

module.exports = get_product_router