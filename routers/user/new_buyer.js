//IMPORTING DEPENDENCIES
const buyer_post_router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//IMPORTING EXTERNAL FILES
const userschema = require('../../dbschemas/userschema')
const { regristration_validation, addressValidation } = require('../../validations_and_auths/login_signup_validations')

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
        otp: null,
        isOtpVerified: false,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedpass,
        confirmpassword: hashedpass,
        gender:req.body.gender,
        role: "buyer",
        sellerid: null,
        adharphoto: null,
        adharname: null,
        adharnumber: null,
        sellerverify: false
    })
    try {
        const useradded = await newuser.save()
        res.json({
            _id: useradded._id,
            email:useradded.email
        })
    } catch (error) {
        res.json({msg:error})
    }

})

//UPDATE ADDRESS INFORMATION
buyer_post_router.patch('/updateaddress/:id', async(req,res) => {

    //VALIDATING USER
    const {error} = addressValidation(req.body)
    if(error) return res.json({msg:error.details[0].message})

    const userInfo = userschema.findByIdAndUpdate(
        req.params.id,        
        {
            address:req.body.address,
            city: req.body.city,
            state: req.body.state,
            userpincode: req.body.userpincode
        },
        (err)=>{
            if(err) return res.json({msg: err})
            res.json({msg:"Address added"})
        }
    )
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

    //GENERATING TOKEN
    const newToken = jwt.sign({_id: isEmailExist._id}, process.env.TOKEN_KEY)
    res.header('auth_token', newToken)

    res.json(
        {
            msg:"Logged in",
            username: isEmailExist.username,
            jtoken:newToken
        })
})

module.exports = buyer_post_router