import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { verifyRequest } from '../../api/request.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function check() {
            const cookies = Cookies.get()

            if (cookies.token) {
                try {
                    const res = await verifyRequest(cookies.token)
                    if (!res.data) {
                        setIsLoggedIn(false)
                        setLoading(false)
                        return
                    }
                    else {
                        setIsLoggedIn(true)
                        setLoading(false)
                    }
                } catch (error) {
                    setIsLoggedIn(false)
                    setLoading(false)
                }
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        check()
    }, [])


    const login = () => setIsLoggedIn(true)

    const logout = () => setIsLoggedIn(false)

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider