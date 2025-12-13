// TO DO
// Will handle any backend operations for the home page
import path from 'path'
import { fileURLToPath } from 'url'
import product from '../models/product.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Gets all listings and sends to front end
export async function getListings(req, res) {
    try {
        const listings = await product.find().populate("seller")
        return res.json(listings)
    } catch (err) {
        console.log("Error loading home page:", err)
        return res.status(500).send("Failed to load home page")
    }
}

// Loads home.html
export async function homePage(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/home.html"));
}