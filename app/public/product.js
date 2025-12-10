// Gets product id for fetch request
const parts = window.location.pathname.split('/')
const id = parts[2]

let images = []
let currentImageIndex = 0

try {
    // Fetches product contents
    fetch(`/api/product/${id}`)
        .then(res => res.json())
        .then(data => {
            images = data.item.images
            if (images.length > 1) {
                createImageButtons()
            }
            // Displays product contents on frontend
            document.getElementById("images").src = data.item.images[currentImageIndex]
            document.getElementById("title").textContent = data.item.title
            document.getElementById("price").textContent = "$" + data.item.price
            document.getElementById("description").textContent = data.item.description
            document.getElementById("sellerEmail").href = `mailto:${data.sellerEmail}`
        })
}
catch (error) {
    console.log("Error getting product", error)
}

// Creates previous and next buttons
function createImageButtons() {
    const container = document.getElementById("imageButtonsContainer") || document.createElement("div")
    container.id = "imageButtonsContainer"
    
    const prevBtn = document.createElement("button")
    prevBtn.textContent = "Previous"
    prevBtn.onclick = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length
        document.getElementById("images").src = images[currentImageIndex]
    }

    const nextBtn = document.createElement("button")
    nextBtn.textContent = "Next"
    nextBtn.onclick = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length
        document.getElementById("images").src = images[currentImageIndex]
    }

    container.appendChild(prevBtn)
    container.appendChild(nextBtn)

    if (!document.getElementById("imageButtonsContainer")) {
        document.getElementById("images").after(container)
    }
}