import { Router } from 'express'
const router = Router()
import { profile, updateProfile, uploadFile } from '../controllers/users.controller.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

router.get('/profile', profile)

router.put('/update/:id', updateProfile)

router.post('/upload', upload.single('file'), uploadFile)

export default router