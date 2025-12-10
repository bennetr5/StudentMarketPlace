import path from 'path'
import { fileURLToPath } from 'url'
import product from '../models/product.js'
import user from '../models/user.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function editPage(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/edit.html"));
}

export async function listItem(req, res) {
    const title = req.body.title
    const desc = req.body.description
    const prodType = req.body.productType
    const price = req.body.price
    const imagePaths = req.files.map(file => file.filename);
    try {
        // TO-DO Upload Listing
        console.log("Uploading listing to :", req.user)
        console.log('Body: ', req.body.title)
        console.log('Files: ', req.files)

        const listingUser = req.user

        const newListing = await product.create({
            images: imagePaths.map(p => "/uploads/" + p),
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

export async function sell(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/sell.html"))
}

export async function updateItem(req, res) {
    const listingId = req.params.id;
    const { title, price, description, type } = req.body;

    try {
        const productItem = await product.findById(listingId);

        if (!productItem) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Security: Ensure user owns the item
        if (!productItem.seller.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Update fields
        productItem.title = title || productItem.title;
        productItem.price = price || productItem.price;
        productItem.description = description || productItem.description;
        productItem.type = type || productItem.type;

        await productItem.save();

        console.log(`Updated listing ${listingId}`);
        return res.json({ success: true });

    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Failed to update item" });
    }
}