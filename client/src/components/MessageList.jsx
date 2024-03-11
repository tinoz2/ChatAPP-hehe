import { useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import FriendSelected from './smaller-components/FriendSelected.jsx';
import SelectFriend from './smaller-components/SelectFriend';

const MessageList = ({ messages, selectedFriend }) => {
    const { user } = useUser();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='messages-container'>
            <div className='container-name bg-slate-700'>
                {selectedFriend ? <FriendSelected selectedFriend={selectedFriend} /> : <SelectFriend />}
            </div>
            <ul>
                {messages.map((message, index) => {
                    const fromMe = message.senderId === user.id;
                    const senderName = fromMe ? 'Me' : selectedFriend?.name;
                    return (
                        <li className={fromMe ? 'me' : 'you'} key={index}>
                            <div className="flex flex-col">
                                <span className="span-message">{senderName}</span>
                                <span className='span-text'>{message.message}</span>
                            </div>
                        </li>
                    );
                })}
                <div ref={messagesEndRef} />
            </ul>
        </div>
    );
}

export default MessageList;