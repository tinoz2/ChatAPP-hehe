import User from '../models/user.js';

export const getConversation = async(req, res) => {
    try {
        const userLogged = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: userLogged } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}