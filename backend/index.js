import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './db.js'
import AuthRoutes from './routes/auth.route.js'
import usersRoutes from './routes/users.route.js'
import messagesRoutes from './routes/messages.route.js'
import conversationRoutes from './routes/conversation.route.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { app, server } from './socket.js'
import dotenv from 'dotenv'
dotenv.config()

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({  
    credentials: true,
    origin: process.env.CLIENT
}))

app.use('/auth', AuthRoutes)
app.use('/users', usersRoutes)
app.use('/messages', messagesRoutes)
app.use('/api', conversationRoutes)

server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    await connectDB()
})