import Router from 'express'
import { authController } from '../controllers/auth.controller'
import { auth } from '../middlewares/auth'

export const router = Router();

// register 
router.post('/register', authController.register)

// login
router.post('/login', authController.login)

// get all users
router.get('/all', auth, authController.all)
