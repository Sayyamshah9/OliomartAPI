const pass_reset_route = require('express').Router()
const bcrypt = require('bcryptjs')
const userschema = require('../../dbschemas/userschema')
const password_validation = require('../../validations_and_auths/login_signup_validations')

//Update Temprory Password in Database
pass_reset_route.patch('/update_temp_pass/:email/:temp_pass', async(req,res)=>{

    const salt = await bcrypt.genSalt(11)
    const hashed_new_pass = await bcrypt.hash(req.params.temp_pass, salt)

    userschema.findOneAndUpdate({email:req.params.email}, 
        {
            password: hashed_new_pass,
            confirmpassword: hashed_new_pass
        },
        (err) => {
            if(err) return res.json({msg:err})
            else{
                res.json({msg:"New Password is Set"})
            }
        }
    )
})

//PASSWORD RESET ROUTE
pass_reset_route.patch('/:email', async(req,res)=>{

    if(req.body.password != req.body.confirmpassword){
        return res.json({msg:"Password Didn't Match"})
    }

    //hashing temp_pass
    const salt = await bcrypt.genSalt(11)
    const hashed_new_pass = await bcrypt.hash(req.body.password, salt)

    userschema.findOneAndUpdate({email:req.params.email}, 
        {
            password: hashed_new_pass,
            confirmpassword: hashed_new_pass
        },
        (err) => {
            if(err) return res.json({msg:err})
            else{
                res.json({msg:"New Password is Set"})
            }
        }
    )
})

module.exports = pass_reset_route