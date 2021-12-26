//IMPORTING DEPENDENCIES
const buyer_post_router = require('express').Router()
const bcrypt = require('bcryptjs')

//IMPORTING EXTERNAL FILES
const userschema = require('../../dbschemas/userschema')
const { regristration_validation } = require('../../validations_and_auths/login_signup_validations')

//POST REQUEST FOR CREATING USER OF TYPE BUYER
buyer_post_router.post('/register', async(req,res)=>{

    //VALIDATING USER
    const {error} = regristration_validation(req.body)
    if(error) return res.json({msg:error.details[0].message})

    //CHECK IF USER ALREADY EXIST
    const doExist = await userschema.findOne({email:req.body.email})
    if(doExist) return res.json({msg:"User Already Exist"})

    //HASHING PASSWORD
    const salt = await bcrypt.genSalt(11)
    const hashedpass = await bcrypt.hash(req.body.password, salt)

    const newuser = new userschema({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedpass,
        confirmpassword: hashedpass,
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

//LOGIN ROUTE
buyer_post_router.post('/login', async(req,res) => {

    //VALIDATING USER
    //check if email entered by user is correct or not
    const isEmailExist = await userschema.findOne({email:req.body.email})
    if(!isEmailExist) return res.json({msg:"Invalid Email"})

    //check if password entered by user is correct or not
    const isPasswordExist = await bcrypt.compare(req.body.password, isEmailExist.password)
    if(!isPasswordExist) return res.json({msg:"Invalid Password"})

    res.json({msg:"Loggedd in"})

})

module.exports = buyer_post_router