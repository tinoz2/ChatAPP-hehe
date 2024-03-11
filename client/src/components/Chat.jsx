import { useEffect, useState } from 'react';
import SendMessageForm from './SendMessageFrom.jsx';
import MessageList from './MessageList.jsx';
import { getMessages, sendMessagesRequest } from '../../api/request.js'
import { useUser } from '../context/UserContext.jsx';
import useMessages from '../hooks/useMessages.js'

const Chat = ({ selectedFriend }) => {

    const { user } = useUser()
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessagesRequest(selectedFriend._id, { message })
            const newMessage = {
                senderId: user._id,
                message
            }
            setMessages([...messages, newMessage]);
            setMessage('');
            setButtonDisabled(true);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setButtonDisabled(message.length === 0 || !selectedFriend);
    }, [message, selectedFriend]);


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (selectedFriend?._id) {
                    const res = await getMessages(selectedFriend?._id)
                    setMessages(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (selectedFriend?._id) {
            fetchMessages()
        }
    }, [selectedFriend?._id, setMessages, message])

    useMessages(setMessages, messages)

    return (
        <form onSubmit={handleSubmit}>
            <MessageList
                messages={messages}
                selectedFriend={selectedFriend} />
            <SendMessageForm
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
                selectedFriend={selectedFriend}
                buttonDisabled={buttonDisabled}
            />
        </form>
    );
};

export default Chat;