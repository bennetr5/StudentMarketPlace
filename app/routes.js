import express from 'express'
import multer from "multer";
import path from 'path';
import passport from 'passport';

// Import your specific controllers
import { redirectLogin, login, validateLogin, checkAuth, logout } from './controllers/loginController.js'
import { signup, createAccount } from './controllers/signupController.js'
import { listItem, sell, editPage, updateItem  } from './controllers/sellController.js'
import { getListings, homePage } from './controllers/homeController.js'
import { product, getProductData } from './controllers/productController.js'
// FIXED: Combined imports into one line
import { getUserListings, profile, deleteListing } from './controllers/profileController.js' 

const router = express.Router()

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // This path must match the static serve path in server.js
        cb(null, 'app/models/uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // Create a unique filename to avoid overwrites
        const hashName = Date.now().toString(36) + Math.random().toString(36).substr(2);
        cb(null, hashName + ext);
    }
});

const upload = multer({ storage });

router.get('/', redirectLogin)
router.get('/login', login)
router.get('/signup', signup)

router.get('/home', checkAuth, homePage)
router.get('/sell', checkAuth, sell)
router.get('/profile', checkAuth, profile)
router.get('/product', checkAuth, product) 

router.get('/home/listings', checkAuth, getListings)
router.get('/api/profile/listings', checkAuth, getUserListings)
router.get('/product/:id', checkAuth, product)
router.get('/api/product/:id', checkAuth, getProductData)

router.delete('/api/profile/listings/:id', checkAuth, deleteListing);

router.get('/edit', checkAuth, editPage);

router.put('/api/product/:id', checkAuth, updateItem);

router.get('/api/user', checkAuth, (req, res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
    })
})

router.post('/sell', upload.array('images', 10), listItem)
router.post('/signup', createAccount)
router.post('/logout', logout) 

router.post('/login', validateLogin,
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
    })
)

export default router