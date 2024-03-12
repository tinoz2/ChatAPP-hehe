import { Link } from 'react-router-dom'
import { updateProfile, updatePhoto } from '../../api/request.js'
import { useState, useRef } from 'react'
import { Button, Modal } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import { useUser } from '../context/UserContext';
import iconProfile from '../img/profile.svg'

const Profile = () => {

    const { user, setUser } = useUser()
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);

    const inputRef = useRef(null)

    const updateName = async () => {
        try {
            if (newName.length < 3) {
                setError('Name must be at least 3 characters')
                return;
            }
            await updateProfile(user.id, { name: newName });
            setUser(prevUser => ({
                ...prevUser,
                name: newName
            }));
            setShowModal(false);
            const addStyle = document.getElementById('container');
            addStyle.classList.remove('active');
        } catch (error) {
            console.log(error);
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
        setError('')
    };

    const onClick = () => {
        setShowModal(!showModal);
        const addStyle = document.getElementById('container')
        addStyle.classList.toggle('active')
    };

    const handleFileChange = async () => {
        inputRef.current.click()
    }

    const handleProfileImage = async (event) => {
        const file = event.target.files[0];
        setFile(file);

        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setUser(prevUser => ({
                ...prevUser,
                imgPath: imgUrl
            }));
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await updatePhoto(formData);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-profile'>
            <div className='container2-profile' id='container'>
                <aside className='aside'>
                    <Link className='flex items-center text-xl' to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Back
                    </Link>
                </aside>
                <hr className='hr-2' />
                <div>
                    <div className='flex items-center mb-12'>
                        <div className=' w-1/2'>
                            <label onClick={handleProfileImage} htmlFor='profileImage'>
                                <img src={user?.imgPath ? user.imgPath : iconProfile} className='cursor-pointer img-profile2' alt='icon profile' style={{ width: '400px', height: '300px', borderRadius: '50%' }} />
                                <input id='profileImage' name='file' type='file'
                                    onChange={handleFileChange} ref={inputRef}
                                    style={{ display: 'none' }} />
                            </label>
                        </div>
                        <p className='ml-6 text-xl capitalize'>{user && user.name}</p>
                    </div>
                    <hr className='custom-hr' />
                    <div className='mt-12'>
                        <div className='flex flex-col justify-start w-fit mt-12'>
                            <strong className='text-lg mb-4'>Edit Name</strong>
                            <button onClick={onClick} className='bg-slate-700 p-3 rounded-md'>Change profile Name</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                icon={<CloudArrowUp size={40} color="#607AFB" style={{ marginBottom: "0.5rem" }} />}
                size="md"
                show={showModal}
                position="top-center"
                onClose={onClick}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#121417',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid #fff',
                }}
            >
                <Modal.Header className='text-white'>Do you want to upload this ?</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 my-2">
                        <input onChange={handleNameChange} type="text" className='text-black p-2 rounded-md' placeholder={user && user.name} maxLength={20} minLength={3} />
                    </div>
                </Modal.Body>
                {error && <p className="error">{error}</p>}
                <Modal.Footer className='mt-4 rounded-sm'>
                    <Button className='p-2 bg-green-700'
                        type="primary" onClick={updateName}>
                        Confirm
                    </Button>
                    <Button className='p-2 bg-red-700 ml-2'
                        type="outlineGray" onClick={onClick}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default Profile