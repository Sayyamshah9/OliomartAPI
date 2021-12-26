const express = require('express')
const router = express()
const userschema = require('../../dbschemas/userschema')

router.get('/', async (req,res) => {

    const allusers = await userschema.find() 
    res.json(allusers)

})

module.exports = router