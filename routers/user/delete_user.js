const delete_user_route = require('express').Router()
const userschema = require('../../dbschemas/userschema')

delete_user_route.delete('/:id', async(req,res)=>{

    const user_tobe_deleted = await userschema.findByIdAndDelete({_id:req.params.id})
    res.send("Deleted")

})

module.exports = delete_user_route