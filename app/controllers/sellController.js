import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function listItem(req, res) {
    
    try {
        // TO-DO Upload Listing
        console.log("Uploading listing to test user: ")
        console.log(req.body)
    }
    catch(error) {
        console.log("Failed to list item:", error)
        res.status(400)
    }
    res.json({message: 'ok'})
}

export async function sell(req, res) {
    res.sendFile(path.join(__dirname, "../views/sell.html"))
}