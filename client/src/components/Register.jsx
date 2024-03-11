import { useForm } from 'react-hook-form'
import '../register.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerRequest } from '../../api/request.js'
import { useAuth } from '../context/AuthContext'

const Register = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const { login } = useAuth()

    const onSubmit = async (data) => {
        try {
            const res = await registerRequest(data)
            if (res) {
                login()
                navigate('/login')
            }
            else {
                console.log('Error')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="flex-column">
                <label>Name </label>
            </div>
            <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input placeholder="Enter your Name" className="input" type="text"
                    {...register('name', {
                        required: true,
                        minLength: 3
                    })} />
            </div>
            {
                errors.name?.type === "required" &&
                <span className='error'>Name is required.</span>
            }
            {
                errors.name?.type === "minLength" &&
                <span className='error'>Name must be at least 3 characters</span>
            }
            <div className="flex-column">
                <label>Email </label>
            </div>
            <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20" fill='#fff'>
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </svg>
                <input placeholder="Enter your Email" className="input" type="text"
                    {...register('email', {
                        required: true,
                        minLength: 5,
                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
                    })} />
            </div>

            {
                errors.email?.type === "required" &&
                <span className='error'>Email is required.</span>
            }
            {
                errors.email?.type === "minLength" &&
                <span className='error'>Email must be at least 5 characters</span>
            }
            {
                errors.email?.type === "pattern" &&
                <span className='error'>Invalid Email</span>
            }

            <div className="flex-column">
                <label>Password </label>
            </div>
            <div className="inputForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20" fill='#fff'>
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                </svg>
                <input placeholder="Enter your Password" className="input" type="password"
                    {...register('password', {
                        required: true,
                        minLength: 8,
                    })} />
            </div>

            {
                errors.password?.type === "required" &&
                <span className='error'>Password is required.</span>
            }
            {
                errors.password?.type === "minLength" &&
                <span className='error'>Password must be at least 8 characters</span>
            }

            <button className="button-submit">Sign Up</button>

            <p className="p">You already have an account? <Link to='/login' className="span">Sign In</Link></p>
        </form>
    )
}

export default Register