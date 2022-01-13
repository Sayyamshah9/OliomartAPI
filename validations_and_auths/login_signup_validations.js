const Joi = require('joi')

const regristration_validation = register =>{

    const new_user = Joi.object({

        username: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(1).required(),
        confirmpassword: Joi.string().min(1).valid(Joi.ref('password')).required(),
        gender: Joi.string().required(),
        address: Joi.string().min(1).required(),
        city: Joi.string().min(1).required(),
        state: Joi.string().min(1).required(),
        userpincode: Joi.string().length(6).required(),
        role: Joi.string().default("buyer"),
        sellerid: Joi.string(),
        adharphoto: Joi.string(),
        adharname: Joi.string(),
        adharnumber: Joi.string(),
        sellerverify: Joi.boolean()

    })
    return new_user.validate(register)
}


const login_user = login =>{
    const loginuser = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(1).required()
    })
    return loginuser.validate(login)
}

module.exports.regristration_validation = regristration_validation
module.exports.login_user = login_user

