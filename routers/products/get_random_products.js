const get_random_product_router = require('express').Router()
const productSchema = require('../../dbschemas/productschema')

get_random_product_router.get('/', async(req,res)=>{

    productSchema.aggregate([
        {$sample: {size: 11}}
    ], function(err, docs) {
        res.json(docs)
});

})

module.exports = get_random_product_router