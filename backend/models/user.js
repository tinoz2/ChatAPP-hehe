import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imgPath: { type: String },
}, { timestamps: true })

export default mongoose.model('User', userSchema)