// TO DO
// Handles any operations with the product page
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function product(req, res) {
    res.sendFile(path.join(__dirname, "../public/views/product.html"))
}