import path from 'path'
import { fileURLToPath } from 'url'
import product from '../models/product.js'
import user from '../models/user.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function listItem(req, res) {
    const title = req.body.title
    const desc = req.body.description
    const prodType = req.body.productType
    const price = req.body.price
    const imagePaths = req.files.map(file => file.path)
    try {
        // TO-DO Upload Listing
        console.log("Uploading listing to test user: ")
        console.log('Body: ', req.body.title)
        console.log('Files: ', req.files)

        const listingUser = await user.findOne({ username: 'testUser' })

        const newListing = await product.create({
            images: imagePaths,
            title: title, 
            description: desc,
            type: prodType,
            price: price,
            seller: listingUser._id
        })

        console.log(newListing)

        listingUser.listings.push(newListing)

        listingUser.save()
    }
    catch(error) {
        console.log("Failed to list item:", error)
        for (const imagePath of imagePaths) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Error deleting file", err)
                }
                else {
                    console.log("Deleted: ", imagePath)
                }
            })
            
        }
        return res.status(400).send("Fail to list item")
    }
    return res.json({ redirect: '/profile' })
}

export async function sell(req, res) {
    res.sendFile(path.join(__dirname, "../views/sell.html"))
}