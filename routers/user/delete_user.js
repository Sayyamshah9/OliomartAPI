const delete_user_route = require('express').Router()
const userschema = require('../../dbschemas/userschema')
const authtoken = require('../../validations_and_auths/authentication_token')

delete_user_route.delete('/:id',  authtoken, async(req,res)=>{

    const user_tobe_deleted = await userschema.findByIdAndDelete({_id:req.params.id})
    res.json({msg:"Deleted"})

})

module.exports = delete_user_route