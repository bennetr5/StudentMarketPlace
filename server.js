import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import User from "./app/user.js";
import Product from "./app/product.js";

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
app.use(express.static("app"))

// Routes
app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/login.html"))
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/home.html"))
})

app.get('/sell', (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/sell.html"))
})

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/profile.html"))
})

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, "app/views/product.html"))
})