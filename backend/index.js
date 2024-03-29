import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import AuthRoutes from './routes/auth.route.js';
import usersRoutes from './routes/users.route.js';
import messagesRoutes from './routes/messages.route.js';
import conversationRoutes from './routes/conversation.route.js';
import cors from 'cors';
import morgan from 'morgan';
import { app, server } from './socket.js';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();

const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({  
    credentials: true,
    origin: process.env.CLIENT || 'http://localhost:5173',
}));
app.options('*', cors());
app.use(morgan('dev')); 

app.use('/auth', AuthRoutes);
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);
app.use('/api', conversationRoutes);
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

server.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
});