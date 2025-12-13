import path from 'path'
import { fileURLToPath } from 'url'
import Product from '../models/product.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Loads product.html
export async function product(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/product.html"))
}

export async function getProductData(req, res) {
    try {
        // Gets productID from frontend request
        const productId = req.params.id;
        
        if (!productId) {
            return res.status(400).json({ error: "No product ID provided" });
        }

        // Gets the product and populates seller
        const productItem = await Product.findById(productId).populate('seller', 'username email');
        
        if (!productItem) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Returns the product and Seller accociated with it
        return res.json(productItem);
    } catch (err) {
        console.log("Error loading product data:", err);
        return res.status(500).json({ error: "Failed to load product" });
    }
}