// Handles all operations with sell page
import path from 'path'
import { fileURLToPath } from 'url'
import product from '../models/product.js'
import user from '../models/user.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create listing
export async function listItem(req, res) {
    const title = req.body.title
    const desc = req.body.description
    const prodType = req.body.productType
    const price = req.body.price
    const imagePaths = req.files.map(file => file.filename);
    try {

        // Gets logged in user and creates a listing
        const listingUser = req.user
        const newListing = await product.create({
            images: imagePaths.map(p => "/uploads/" + p),
            title: title, 
            description: desc,
            type: prodType,
            price: price,
            seller: listingUser._id
        })

        // Adds the listing to user
        listingUser.listings.push(newListing)

        // Saves to database
        listingUser.save()
    }
    catch(error) {
        console.log("Failed to list item:", error)
        // Deletes all images that were uploaded if listing fails
        for (const img of imagePaths) {
            const imgPath = path.join("app/models/uploads/", img)
            fs.unlink(imgPath, (err) => {
                if (err) {
                    console.log("Error deleting file", err)
                }
                else {
                    console.log("Deleted: ", imgPath)
                }
            })
        }
        return res.status(400).send("Fail to list item")
    }
    return res.json({ redirect: '/profile' })
}

// Loads sell.html page
export async function sell(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/sell.html"))
}