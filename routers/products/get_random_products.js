const get_random_product_router = require('express').Router()
const productSchema = require('../../dbschemas/productschema')
const authToken = require('../../validations_and_auths/authentication_token')

get_random_product_router.get('/', async(req,res)=>{

    productSchema.aggregate([
        {$match: {pverify: true}},
        {$sample : {size:1000}}
    ], 
        function(err, docs) {
        res.json(docs)
    });

})

module.exports = get_random_product_router
