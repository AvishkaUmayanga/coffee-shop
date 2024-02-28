import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authToken = (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        if(token==null){
            return res.status(401).json({message: 'Unauthorized'})
        }
        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if(err){
                return res.status(403).json({message: 'Forbidden'})
            }
            req.user = user
            next()
        })
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next()
    }
    else{
        return res.status(403).json({ message: 'Forbidden' })
    }
}

export {authToken, isAdmin}