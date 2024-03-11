import { Router } from 'express'
import { validateUser } from '../middlewares/validateUser.js'
import { getConversation } from '../controllers/conversation.controller.js'
const router = Router()

router.get('/users', validateUser, getConversation)

export default router