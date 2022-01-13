const jwt = require('jsonwebtoken')

module.exports = function authToken(req, res, next) {
    
    const token = req.header('auth_token')
    if(!token) return res.json({msg:"Access Denied"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.userschema = verified
        // var userId = jwt.decode(token)._id
        // return userId
        // console.log(userId);
        next()
    } catch (err) {
        res.json({msg:"Invalid Token"})
    }
}