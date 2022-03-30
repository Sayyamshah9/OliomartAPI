const add_to_cart_route = require('express').Router()

const carts = require('../../dbschemas/cartschema')

add_to_cart_route.post('/:uid/:pid', async(req , res) =>{

    const newCart = new carts({

      cuserId : req.params.uid,
      productId : req.params.pid

    })

    try{
        const saveCart = await newCart.save()
        res.json(saveCart)
    }catch(err){
        if(err) return res.json({msg:err})
    }

})
module.exports = add_to_cart_route

