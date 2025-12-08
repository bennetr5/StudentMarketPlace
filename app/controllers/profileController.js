// TO DO
// Handles any operations with the profile page
import path from 'path'
import { fileURLToPath } from 'url'
import Product from '../models/product.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve the HTML file
export async function profile(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/profile.html"))
}

// Return all products for the logged-in user
export async function getUserListings(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Not logged in" })
        }

        const listings = await Product
            .find({ seller: req.user._id })  // use seller field from product.js
            .populate("seller")

        return res.json(listings)
    } catch (err) {
        console.log("Error loading profile listings:", err)
        return res.status(500).json({ error: "Failed to load listings" })
    }
}
