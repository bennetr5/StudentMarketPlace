// Handles any operations with the product page
import path from 'path'
import { fileURLToPath } from 'url'
import Product from '../models/product.js'
import User from '../models/user.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sends back product data to frontend
export async function getProduct(req, res) {
    const item = await Product.findById(req.params.id).populate('seller')
    const sellerEmail = item.seller.email
    res.json({item, sellerEmail})
}

// Loads product.html
export async function product(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/product.html"))
}