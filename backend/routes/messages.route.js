import { Router } from 'express'
const router = Router()
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { validateUser } from '../middlewares/validateUser.js'

router.get("/:id", validateUser, getMessages)

router.post("/send/:id", validateUser, sendMessage)

export default router