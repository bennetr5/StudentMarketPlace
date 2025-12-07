import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function redirectLogin(req, res) {
    res.redirect('/login')
}

export function login(req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'))
}

export function validateLogin(req, res, next) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        console.log('Missing information required to login')
        res.status(400).redirect('/login')
    }

    next()
}

export function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/login')
}

export function logout(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
}