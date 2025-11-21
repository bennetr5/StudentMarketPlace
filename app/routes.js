import loginController from './controllers/loginController.js'
import productController from './controllers/productController.js'
import profileController from './controllers/profileController.js'
import sellController from './controllers/sellController.js'
import homeController from './controllers/homeController.js'

// Define routes
const routes = {
    "login.html": loginController,
    "product.html": productController,
    "profile.html": profileController,
    "sell.html": sellController,
    "home.html": homeController
}

// Gets current page
const page = window.location.pathname.split("/").pop()

// Init Controller
if(routes[page]) {
    routes[page]()
}