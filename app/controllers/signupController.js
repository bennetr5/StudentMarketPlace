import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import user from '../models/user.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function signup(req, res) {
    res.sendFile(path.join(__dirname, '../views/signup.html'))
}

export async function createAccount(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    const validSignup = await validateSignup(username, email, password, password2)
    if (!validSignup) {
        return res.status(400).redirect('/signup')
    }
    else {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newAccount = new user({
            username: username,
            email: email,
            password: hashedPassword,
            listings: []
        })

        console.log(`Account ${newAccount.username} successfuly created!`)
        
        newAccount.save()
        return res.redirect('/login')
    }
}

async function validateSignup(usern, em, pw, pw2) {
    if (!usern || !em || !pw || !pw2) {
        console.log("Fill out all fields")
        return false
    }
    if (await user.findOne({ username: usern }) || usern.includes(" ")) {
        console.log("Invalid Username")
        return false
    }
    else if (await user.findOne({ email: em })) {
        console.log("Invalid Email")
        return false
    }
    else if (em.substring(em.length - 8, em.length) !== '@pfw.edu') {
        console.log("Must use @pfw.edu email")
        return false
    }
    else if (pw.length < 6) {
        console.log("Password needs to be atleast 6 characters")
        return false
    }
    else if (pw !== pw2) {
        console.log("Passwords do not match")
        return false
    }
    else { return true }
}