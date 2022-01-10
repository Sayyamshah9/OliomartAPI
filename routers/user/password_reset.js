const pass_code_route = require('express').Router()
const pass_reset_route = require('express').Router()
const bcrypt = require('bcryptjs')
const userschema = require('../../dbschemas/userschema')
const password_validation = require('../../validations_and_auths/login_signup_validations')

pass_code_route.patch('/:email', async(req,res)=>{

    const userexist = await userschema.findOne({email:req.params.email})
    if(userexist){

        //generating random string of length 6
        let temp_pass = Math.random().toString(36).slice(2);   

        //after generating temp_pass send it to the mail and also save it to DB

        res.send(temp_pass) //send temp_pass to user through mail
        
        //hashing temp_pass
        const salt = await bcrypt.genSalt(11)
        const hashed_temp_pass = await bcrypt.hash(temp_pass, salt)

        //updating password in schema
        userschema.findOneAndUpdate({email:req.params.email},
            {
                password: hashed_temp_pass,
                confirmpassword: hashed_temp_pass
            },
            (err) => {
                if(err) res.json({msg:err})
            })
    }else{
        res.json({msg:"User Does Not exist"})
    }
})

//PASSWORD RESET ROUTE
pass_reset_route.patch('/:email', (req,res)=>{

    const {error} = password_validation.regristration_validation(req.body)
    if(error) return res.json({msg : "Password Didn't Match"})

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
        }
    )
})

module.exports = pass_code_route