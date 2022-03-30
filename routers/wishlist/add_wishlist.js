const add_wishlist_router = require('express').Router()
const wishlistschema = require('../../dbschemas/wishlistschema')

add_wishlist_router.post('/:uid/:pid', async(req,res)=>{

    const newWish =  new wishlistschema({

        wuserid : req.params.uid,
        wproductid : req.params.pid

    })

    try {
        const saveWish = await newWish.save()
        res.json(saveWish)

    } catch (err) {
        if(err) return res.json({msg:err})
    }

})
module.exports = add_wishlist_router