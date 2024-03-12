import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext.jsx';
import io from 'socket.io-client'
import { URL_BACKEND } from '../../config/host.js';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const socket = io(URL_BACKEND, {
                query: { userId: user.id }
            })

            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [user])


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
export default SocketProvider