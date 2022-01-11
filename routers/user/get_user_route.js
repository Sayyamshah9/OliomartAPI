const express = require('express')
const router = express()
const userschema = require('../../dbschemas/userschema')
const authToken = require('../../validations_and_auths/authentication_token')

router.get('/', authToken, async (req,res) => {

    const allusers = await userschema.find() 
    res.json(allusers)

})

router.get('/:id', authToken, async(req,res) => {

    const user = await userschema.findById(req.params.id)
    res.json(user)
    
})

module.exports = router