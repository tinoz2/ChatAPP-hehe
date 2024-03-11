import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import Profile from './components/Profile.jsx'
import UserProvider from './context/UserContext.jsx'
import SocketProvider from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <SocketProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </SocketProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>,
)
