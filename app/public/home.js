fetch('/home/listings')
    .then(res => res.json())
    .then(listings => {
        const container = document.getElementById("listings")
        listings.forEach(listing => {
            const imageUrl = listing.images[0]
            const card = document.createElement("div")
            card.className = "listing-card"
            card.innerHTML = `
                    <h2>${listing.title}</h2>
                    <p>${listing.description}</p>
                    <p>$${listing.price}</p>
                    ${imageUrl ? `<img src="${imageUrl}">` : `<p>No image</p>`}
                `
            container.appendChild(card)
        })
    }) 
    .catch(err => console.error("Failed to load listings:", err))