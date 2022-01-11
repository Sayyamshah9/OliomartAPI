const jwt = require('jsonwebtoken')

module.exports = function authToken(req, res, next) {
    
    const token = req.header('auth_token')
    if(!token) return res.json({msg:"Access Denied"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.userschema = verified
        next()
    } catch (err) {
        res.json({msg:"Invalid Token"})
    }
}