const send_otp_router = require('express').Router()
const { sendEmailOtp } = require('../../configurations/send_email')
const userSchema = require('../../dbschemas/userschema')


send_otp_router.put('/:email', async(req,res) => {

    const findUser = await userSchema.findOne({email:req.params.email})
    if(!findUser) return res.json({msg:"User Does not Exist"})

    const otpGenerated = sendEmailOtp(req.params.email, findUser.username)

    const sendTo = userSchema.findOneAndUpdate(
        {email: req.params.email},
        {
            otp:otpGenerated
        },
        (err) => {
            if(err) return res.json({msg:err})
            res.json({msg:"OTP updated"})
        }
    )
})

module.exports = send_otp_router