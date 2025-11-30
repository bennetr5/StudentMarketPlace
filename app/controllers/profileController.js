// TO DO
// Handles any operations with the profile page
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function profile(req, res) {
    res.sendFile(path.join(__dirname, "../views/profile.html"))
}