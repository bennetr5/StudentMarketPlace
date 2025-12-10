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

// --- VIEW ROUTES (Serve HTML Pages) ---
router.get('/', redirectLogin)
router.get('/login', login)
router.get('/signup', signup)

// Protected Views (Require Login)
router.get('/home', checkAuth, homePage)
router.get('/sell', checkAuth, sell)
router.get('/profile', checkAuth, profile)
router.get('/product', checkAuth, product) 

// --- API ROUTES (Data for Frontend JS) ---
router.get('/home/listings', checkAuth, getListings)            // Feeds home.html
router.get('/api/profile/listings', checkAuth, getUserListings) // Feeds profile.html
router.get('/api/product', checkAuth, getProductData)           // Feeds product.html

// Delete Route
router.delete('/api/profile/listings/:id', checkAuth, deleteListing);

// Serve the Edit Page (View)
router.get('/edit', checkAuth, editPage);
// API Route to Update the Item (PUT)
router.put('/api/product/:id', checkAuth, updateItem);

// Simple API to get current user info
router.get('/api/user', checkAuth, (req, res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
    })
})

// --- ACTION ROUTES (Form Submissions) ---
router.post('/sell', upload.array('images', 10), listItem)
router.post('/signup', createAccount)
router.post('/logout', logout) 

// Login Handling (Uses Passport Strategy)
router.post('/login', validateLogin,
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        // failureMessage: true 
    })
)

export default router