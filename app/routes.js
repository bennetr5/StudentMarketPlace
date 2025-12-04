import express from 'express'
import multer from "multer";

import { redirectLogin } from './controllers/loginController.js'
import { login } from './controllers/loginController.js'
import { listItem } from './controllers/sellController.js'
import { sell } from './controllers/sellController.js'
import { home } from './controllers/homeController.js'
import { product } from './controllers/productController.js'
import { profile } from './controllers/profileController.js'

const router = express.Router()
const upload = multer({ dest: 'app/models/uploads' })

// Routes
router.get('/', redirectLogin)
router.get('/login', login)
router.get('/home', home)
router.get('/sell', sell)
router.get('/product', product)
router.get('/profile', profile)

router.post('/sell', upload.array('images', 10), listItem)

export default router