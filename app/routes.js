import express from 'express'

import { redirectLogin } from './controllers/loginController.js'
import { login } from './controllers/loginController.js'
import { listItem } from './controllers/sellController.js'
import { sell } from './controllers/sellController.js'
import { home } from './controllers/homeController.js'
import { product } from './controllers/productController.js'
import { profile } from './controllers/profileController.js'

const router = express.Router()

// Routes
router.get('/', redirectLogin)
router.get('/login', login)
router.get('/home', home)
router.get('/sell', sell)
router.get('/product', product)
router.get('/profile', profile)

router.post('/sell', listItem)

export default router