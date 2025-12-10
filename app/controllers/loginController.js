import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// redirects to login for root
export function redirectLogin(req, res) {
    res.redirect('/login')
}

// Loasds login.html page
export function login(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

// Validates login makes sure username and password are not empty
export function validateLogin(req, res, next) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        console.log('Missing information required to login')
        res.status(400).redirect('/login')
    }

    next()
}

// Checks if a user has logged in
// Prevents direct access to other pages
export function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    
    // Redirects to login page if not
    return res.redirect('/login')
}

// Deserializes user with req.logout
export function logout(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
}