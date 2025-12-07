import express from 'express'
import multer from "multer";
import path from 'path';
import passport from 'passport';

import { redirectLogin, login, validateLogin, checkAuth, logout} from './controllers/loginController.js'
import { signup, createAccount } from './controllers/signupController.js'
import { listItem, sell } from './controllers/sellController.js'
import { getListings, homePage } from './controllers/homeController.js'
import { product } from './controllers/productController.js'
import { profile } from './controllers/profileController.js'

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'app/models/uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const hashName = file.filename || Date.now().toString(36);
        cb(null, hashName + ext);
    }
});

const upload = multer({ storage });

// Routes
router.get('/', redirectLogin)
router.get('/login', login)
router.get('/signup', signup)
router.get('/home/listings', checkAuth, getListings)
router.get('/home', checkAuth, homePage)
router.get('/sell', checkAuth, sell)
router.get('/product', checkAuth, product)
router.get('/profile', checkAuth, profile)

router.post('/sell', upload.array('images', 10), listItem)
router.post('/signup', createAccount)
router.post('/login', validateLogin,
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureMessage: true
    }))
router.post('/logout', logout) 

export default router