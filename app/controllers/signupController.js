// Handles all signup operations
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import user from '../models/user.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Loads signup.html page
export function signup(req, res) {
    res.sendFile(path.join(__dirname, '../public/views/signup.html'))
}

// Creates user accout then redirects them to login
export async function createAccount(req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const password2 = req.body.password2

    // Checks if signup is valid
    const validSignup = await validateSignup(username, email, password, password2)
    if (!validSignup) {
        return res.status(400).redirect('/signup')
    }
    else {
        // Hashes password for security
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Creates new account
        const newAccount = new user({
            username: username,
            email: email,
            password: hashedPassword,
            listings: []
        })

        console.log(`Account ${newAccount.username} successfuly created!`)
        
        // Saves account to Database
        newAccount.save()
        return res.redirect('/login')
    }
}

// Validates signup
async function validateSignup(usern, em, pw, pw2) {
    // Checks if all fields are filled out
    if (!usern || !em || !pw || !pw2) {
        console.log("Fill out all fields")
        return false
    }
    // Username cannot contain spaces
    if (await user.findOne({ username: usern }) || usern.includes(" ")) {
        console.log("Invalid Username")
        return false
    }
    // If email alread exists in Database
    else if (await user.findOne({ email: em })) {
        console.log("Invalid Email")
        return false
    }
    // Forces email to be @pfw.edu
    else if (em.substring(em.length - 8, em.length) !== '@pfw.edu') {
        console.log("Must use @pfw.edu email")
        return false
    }
    // Passwords have to be more than 6 character and match
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