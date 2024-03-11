import { useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'

const useMessages = (setMessages, messages) => {

    const { socket } = useSocket()
    
    useEffect(() => {
        socket?.on('message', (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("message")
    }, [socket, setMessages, messages])

}

export default useMessages