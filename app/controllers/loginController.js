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