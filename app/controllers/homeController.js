// TO DO
// Will handle any backend operations for the home page
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function home(req, res) {
    res.sendFile(path.join(__dirname, "../views/home.html"))
}