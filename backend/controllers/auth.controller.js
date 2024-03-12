import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, password: passwordHash, email })

        jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15d' }, (err, token) => {
            err ? console.log(err) :
                res.cookie('token', token)
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })
        })
    }
    catch {
        res.status(400).json({ msg: 'Error to create an account' })
    }
}

const login = async (req, res) => {
    try {
        const { password, email } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'Email does not exist' })

        const passwordIsMatch = await bcrypt.compare(password, user.password)

        if (!passwordIsMatch) return res.status(400).json({ msg: 'Invalid credentials' })

        jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15d' }, (err, token) => {
            err ? console.log(err) :
                res.cookie('token', token)
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })
        })
    }
    catch {
        res.status(400).json({ msg: 'Invalid credentials' })
    }
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ msg: 'Logged out' })
}

const verify = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.json({ msg: 'No token' })
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.json({ msg: 'Invalid token' })
        
        const userFound = User.findById(user.id)
        if (!userFound) return res.json({ msg: 'User not found' })
        res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        })
    })
}

export { register, login, logout, verify }