import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

export const profile = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.json({ msg: 'No token' })

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) return res.json({ msg: 'Invalid token' })

        try {
            const userFound = await User.findById(decodedToken.id)
            if (!userFound) return res.json({ msg: 'User not found' })

            res.json({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                imgPath: userFound.imgPath,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Server error' })
        }
    })
}

export const updateProfile = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.json({ msg: 'No token' });

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) return res.json({ msg: 'Invalid token' });

        try {
            const { name } = req.body;
            const updatedUser = await User.findByIdAndUpdate(decodedToken.id, { name }, { new: true });

            if (!updatedUser) return res.json({ msg: 'User not found' });

            res.json({ msg: 'User updated', user: updatedUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Server error' });
        }
    });
};

export const uploadFile = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ msg: 'No token' });

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        try {
            const userFound = await User.findById(decodedToken.id);
            if (!userFound) return res.status(404).json({ msg: 'User not found' });
            console.log(req.file)

            if (!req.file) {
                return res.status(400).json({ msg: 'No file uploaded' });
            }

            const { filename } = req.file;
            const tempPath = req.file.path;
            const newPath = `uploads/${filename}`;

            fs.renameSync(tempPath, newPath);

            userFound.imgPath = newPath;
            await userFound.save();

            res.json({ msg: 'File uploaded', imgPath: newPath });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Server error' });
        }
    });
}