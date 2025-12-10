import path from 'path'
import { fileURLToPath } from 'url'
import Product from '../models/product.js' // Make sure this matches your model filename exactly

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Serve the HTML file
export async function product(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/product.html"))
}

// 2. API to fetch product data (New Function)
export async function getProductData(req, res) {
    try {
        // The frontend will request /api/product?id=12345
        const productId = req.query.id;
        
        if (!productId) {
            return res.status(400).json({ error: "No product ID provided" });
        }

        // Find product and populate seller info (username/email)
        const productItem = await Product.findById(productId).populate('seller', 'username email');
        
        if (!productItem) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json(productItem);
    } catch (err) {
        console.log("Error loading product data:", err);
        return res.status(500).json({ error: "Failed to load product" });
    }
}