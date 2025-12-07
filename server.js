import express from 'express'
import router from './app/routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import session from 'express-session'
import passport from 'passport'
import passportConfig from './app/controllers/passport.js'

// Express
const app = express();
// file init
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// dotenv initialization
dotenv.config()
const PORT = process.env.PORT || 8080
const MONGO_URL = process.env.MONGO_URL

// Connect to DB and start server
mongoose.connect(MONGO_URL)
.then(() => {
    console.log("DB Connected!")
    app.listen(PORT, () => {
        console.log(`Running @ http://localhost:${PORT}`)
    })
})
.catch((error) => { console.log(error)})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('app'))
app.use('/uploads', express.static(path.join(__dirname, 'app/models/uploads')))

app.use(session({
    secret: "1234",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use('/', router)