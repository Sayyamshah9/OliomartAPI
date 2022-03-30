const get_wishlist_router = require('express').Router()
const wishlistschema = require('../../dbschemas/wishlistschema')

get_wishlist_router.get('/:uid', async(req, res)=>{

    try {
        const getwish = await wishlistschema.find({wuserid : req.params.uid})
                                            .populate("wproductid")
        res.json(getwish)
    } catch (error) {
        res.json({msg:error})
        
    }

})
module.exports = get_wishlist_router