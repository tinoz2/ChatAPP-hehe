import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';
import Chat from './Chat';
import iconProfile from '../img/profile.svg'
import { useSocket } from '../context/SocketContext.jsx'

const FriendsAside = () => {
    const { friends } = useUser();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const { onlineUsers } = useSocket();
    const [friendsOnlineStatus, setFriendsOnlineStatus] = useState({});

    useEffect(() => {
        const friendsStatus = {};
        friends.forEach(friend => {
            friendsStatus[friend._id] = onlineUsers.includes(friend._id);
        });
        setFriendsOnlineStatus(friendsStatus);
    }, [friends, onlineUsers]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
    };

    return (
        <aside className="mt-6 flex flex-col justify-between">
            <div>
                <p className="text-xl font-semibold flex items-center">Chat <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                </p>
                <hr className='w-32 my-6 custom-hr' />
            </div>
            <div className='container-friends'>
                {friends.length <= 0 ? <p className='text-center text-xl font-semibold'>No friends  </p> :
                    friends.map((friend, index) => (
                        <div key={index} className='flex items-center justify-between bg-slate-700 p-3 px-4 rounded-md my-4 mr-2 hover container-div' onClick={() => handleFriendClick(friend)}>
                            <div className='text-friends'>
                                <strong className='friend-name'>{friend.name}</strong>
                                <img src={friend.imgPath ? `http://localhost:8080/${friend.imgPath}` : iconProfile} className='my-2' style={{ borderRadius: '50%', width: '40px', height: '40px' }} alt="" />
                            </div>
                            <div>
                                {friendsOnlineStatus[friend._id] ? <span className='online'></span> : <span className='offline'></span>}
                            </div>
                        </div>
                    ))}
            </div>
            <Chat
                selectedFriend={selectedFriend}
                friends={friends} />
        </aside>
    )
}

export default FriendsAside;