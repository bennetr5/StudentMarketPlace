// Gets all listings from database
fetch('/home/listings')
    .then(res => res.json())
    .then(listings => {
        // Creates a contaner to hold all listings
        const container = document.getElementById("listings")
        
        // Loops through each listing adding them to the container
        listings.forEach(listing => {
            const imageUrl = listing.images[0]
            const card = document.createElement("button")
            card.addEventListener("click", () => goToProduct(listing))
            card.className = "listing-card"
            card.innerHTML = `
                    <h2>${listing.title}</h2>
                    <p>$${listing.price}</p>
                    ${imageUrl ? `<img src="${imageUrl}">` : `<p>No image</p>`}
                `
            container.appendChild(card)
        })
    }) 
    .catch(err => console.error("Failed to load listings:", err))

// Goes to product page when user clicks on image
function goToProduct(listing) {
    window.location.href = `/product/${listing._id}`
}