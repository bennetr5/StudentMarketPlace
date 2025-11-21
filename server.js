import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static("app"))

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

app.listen(8080, () => {
    console.log("Running @ http://localhost:8080")
})