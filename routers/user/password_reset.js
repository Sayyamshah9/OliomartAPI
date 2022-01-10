const pass_code_route = require('express').Router()
const pass_reset_route = require('express').Router()
const bcrypt = require('bcryptjs')
const userschema = require('../../dbschemas/userschema')

pass_reset_route.patch('/:email', async(req,res)=>{

    const userexist = await userschema.findOne({email:req.params.email})
    if(userexist){

        if(req.body.password == req.body.confirmpassword){

        //hashing temp_pass
        const salt = await bcrypt.genSalt(11)
        const hashed_new_pass = await bcrypt.hash(req.body.password, salt)

        //UPDATING NEW PASSWORD
        userschema.findOneAndUpdate({email:req.params.email}, 
            {
                password: hashed_new_pass,
                confirmpassword: hashed_new_pass
            },
            (err) => {
                if(err) return res.json({msg:err})
                else {
                    res.json({msg:"Password Updated Successfully"})
                }
            })

        }else{
            res.json({msg:"Password didn't match"})
        }
        
    }else{
        res.json({msg:"User Does Not exist"})
    }
})

module.exports = pass_reset_route