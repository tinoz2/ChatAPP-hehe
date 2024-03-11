import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

export const validateUser = async (req, res, next) => {
    try {
        const {token} = req.cookies
        
        if(!token) return res.status(401).json({error: 'Unauthorized'})

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if(!decoded) return res.status(401).json({error: 'Unauthorized'})

        const user = await User.findById(decoded.id)

        req.user = user

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}