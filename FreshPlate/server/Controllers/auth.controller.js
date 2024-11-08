import User from '../Models/user.model.js'
import jwt from 'jsonwebtoken'
//import expressJwt from 'express-jwt'
import { expressjwt } from "express-jwt";
import config from '../config/config.js'
const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "username": req.body.username }) 
        if (!user)
        return res.status('401').json({ error: "User not found" }) 
        if (!user.authenticate(req.body.password)) {
        return res.status('401').send({ error: "Username and password don't match." })
        }
        const token = jwt.sign({ _id: user._id, username: user.username}, config.jwtSecret) 
        res.cookie('t', token, { expire: new Date() + 9999 }) 
        return res.json({
        token, 
        user: {
        _id: user._id, 
        username: user.username,
        email: user.email 
        }
        })
        } catch (err) {
        return res.status('401').json({ error: "Could not sign in" }) 
        }
        
}
const signout = (req, res) => {
        res.clearCookie("t")
        return res.status('200').json({ 
        message: "signed out"
        }) 

}
const requireSignin = expressjwt({ 
    secret: config.jwtSecret, 
    algorithms: ["HS256"],
    userProperty: 'auth'
    })
    
    const setUser = async (req, res, next) => {
        if (req.auth && req.auth._id && req.auth.username) {
            req.user = {
                _id: req.auth._id,
                username: req.auth.username
            }
            next()
        } else {
            return res.status(401).json({ error: "Not authorized" })
        }
    }

    const hasAuthorization = (req, res, next) => { 
        const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id 
        if (!(authorized)) {
        return res.status('403').json({ 
        error: "User is not authorized"
        }) 
        } 
        next()
        }
        
export default { signin, signout, requireSignin, hasAuthorization, setUser }
