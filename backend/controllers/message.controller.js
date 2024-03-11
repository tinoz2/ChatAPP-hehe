import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import { getReceiverSocketId } from '../socket.js'
import { io } from '../socket.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        conversation.save()
        newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('message', newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}