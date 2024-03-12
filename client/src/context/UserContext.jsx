import { createContext, useContext, useState, useEffect } from 'react';
import { profileRequest, getFriends } from '../../api/request.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await profileRequest()
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [user])

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await getFriends()
                setFriends(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFriends()
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser, friends, setFriends }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export default UserProvider