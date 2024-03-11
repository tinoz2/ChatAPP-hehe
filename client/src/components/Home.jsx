import { useAuth } from '../context/AuthContext'
import iconProfile from '../img/profile.svg'
import FriendsAside from './FriendsAside'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useState, useEffect } from 'react'
import { profileRequest } from '../../api/request'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Home = () => {

    const [img, setImg] = useState(null)
    const { isLoggedIn } = useAuth()
    const [darkMode, setDarkMode] = useState('dark-mode');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await profileRequest()
                setImg(res.data.imgPath)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchImage()
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const modeClass = darkMode ? 'dark-mode' : 'light-mode';

    const openModal = () => {
        MySwal.fire("If your friends do not appear, reload the page");
    }

    return (
        <main className={modeClass}>
            <nav className="flex justify-between mb-4 items-center">
                <div>
                    <h1 className="font-semibold text-2xl mr-4">hehe.</h1>
                </div>
                <ul className="flex items-center ul-buttons">
                    <button onClick={toggleDarkMode}>
                        {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌑'}
                    </button>
                    <button onClick={openModal} className="button-help">Help</button>
                    <Link to='/profile'>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src={img ? `http://localhost:8080/${img}` : iconProfile} className='w-full h-full cursor-pointer img-profile' alt="" />
                        </div>
                    </Link>
                </ul>
            </nav>
            <hr className='custom-hr' />
            <div className='flex flex-col max-w-60'>
                <div className='flex'>
                    <FriendsAside />
                </div>
                <div className='flex container-chat'>
                    {
                        isLoggedIn ? <Link to='/register' className='button mt-16'><Logout /></Link>
                            : <Link to='/register' className='button mt-16'>Register</Link>
                    }
                </div>
            </div>
        </main>
    )
}

export default Home