import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import Product from '../../models/product.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Loads profile.html
export async function profile(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/profile.html"))
}

// Gets all the logged in user's products
export async function getUserListings(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Not logged in" })
        }
        // Gets listings of user and sends to front end
        const listings = await Product.find({ seller: req.user._id })
        return res.json(listings)
    } catch (err) {
        console.log("Error loading profile listings:", err)
        return res.status(500).json({ error: "Failed to load listings" })
    }
}

// Deletes listing
export async function deleteListing(req, res) {
    // Gets listing Id from request
    const listingId = req.params.id;

    try {
        // Searches for product in DB
        const product = await Product.findById(listingId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Double check if user owns product
        if (!product.seller.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized: You do not own this item" });
        }

        // Delete accociated images from uploads folder
        if (product.images && product.images.length > 0) {
            product.images.forEach(imagePath => {
                const filename = imagePath.split('/').pop();
                const fullPath = path.join(__dirname, '../models/uploads', filename);

                fs.unlink(fullPath, (err) => {
                    if (err) console.error("Failed to delete local image:", err);
                });
            });
        }

        // Remove listing from user DB
        req.user.listings.pull(product._id);
        await req.user.save();

        // Delete product from products DB
        await Product.deleteOne({ _id: listingId });

        console.log(`Deleted listing ${listingId}`);
        return res.json({ success: true });

    } catch (err) {
        console.error("Error deleting listing:", err);
        return res.status(500).json({ error: "Server failed to delete item" });
    }
}