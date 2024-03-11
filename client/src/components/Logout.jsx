import { useNavigate } from 'react-router-dom'
import { logoutRequest } from '../../api/request'
import { useAuth } from '../context/AuthContext'

const Logout = () => {

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await logoutRequest()
            if (res.data) {
                logout()
                navigate('/login')
            }
            else {
                console.log("Error")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout