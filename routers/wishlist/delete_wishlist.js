const delete_wishlist_router = require('express').Router()
const wishlistschema = require('../../dbschemas/wishlistschema')

delete_wishlist_router.delete('/:pid', async(req, res) =>{

    try {
        const deletewish = await wishlistschema.deleteOne({wproductid : req.params.pid})
        res.json(deletewish)

    } catch (err) {
        res.json({msg:err})
    }

})
module.exports = delete_wishlist_router
