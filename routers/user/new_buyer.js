//IMPORTING DEPENDENCIES
const buyer_post_router = require('express').Router()

//IMPORTING EXTERNAL FILES
const userschema = require('../../dbschemas/userschema')

//POST REQUEST FOR CREATING USER OF TYPE BUYER
buyer_post_router.post('/', async(req,res)=>{

    const newuser = new userschema({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        gender:req.body.gender,
        address:req.body.address,
        city: req.body.city,
        state: req.body.state,
        userpincode: req.body.userpincode,
        usertype: true,
        sellerid: null,
        adharphoto: null,
        adharname: null,
        adharnumber: null,
        sellerverify: false
    })
    try {
        const useradded = await newuser.save()
        res.json(useradded)
    } catch (error) {
        res.json({msg:error})
    }

})

module.exports = buyer_post_router