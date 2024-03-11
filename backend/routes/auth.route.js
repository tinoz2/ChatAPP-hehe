import { register, login, logout, verify } from '../controllers/auth.controller.js'
import { validateRegister, validateLogin } from '../middlewares/auth.middleware.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { Router } from 'express'
const router = Router()

router.post('/register', validateMiddleware(validateRegister), register)

router.post('/login', validateMiddleware(validateLogin), login)

router.post('/logout', logout)

router.post('/verify', verify)

export default router