import jwt from 'jsonwebtoken'
import config from './config'

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

const authenticate = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        // Remove the string "Bearer" from the token field
        const onlyToken = token.slice(7, token.length)
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).send({error: "Invalid access token"})
            }
            req.user = token
            next()
            return
        })
    }
    return res.status(401).send({error: "Access token was not supplied"})
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next()
    }
    return res.status(401).send({error: "Access denied"})
}

export {
    getToken,
    authenticate,
    isAdmin
}