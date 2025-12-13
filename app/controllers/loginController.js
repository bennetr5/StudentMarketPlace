import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Redirects to login from root '/'
export function redirectLogin(req, res) {
    res.redirect('/login')
}

// Loads login.html page
export function login(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

// Validates login (checks for empty creds)
export function validateLogin(req, res, next) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        console.log('Missing information required to login')
        res.status(400).redirect('/login')
    }

    next()
}

// Checks auth (passport)
export function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/login')
}

// Logs user out and deauthenticates them
export function logout(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
}