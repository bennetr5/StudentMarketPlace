document.addEventListener("DOMContentLoaded", async () => {
    const usernameHeader = document.getElementById("usernameDisplay")
    const listingsDiv = document.getElementById("userListings")

    const showMessage = (msg) => {
        listingsDiv.innerHTML = `<p>${msg}</p>`
    }

    try {
        // Get current user
        const userRes = await fetch("/api/user")
        if (!userRes.ok) {
            showMessage("Error loading user.")
            console.error("User fetch failed:", userRes.status)
            return
        }
        const user = await userRes.json()
        usernameHeader.textContent = `${user.username}'s Listings`

        // Get user product listings
        const listRes = await fetch("/api/profile/listings")
        if (!listRes.ok) {
            showMessage("Error loading listings.")
            console.error("Listings fetch failed:", listRes.status)
            return
        }
        const listings = await listRes.json()

        if (!listings.length) {
            showMessage("You don't have any listings yet.")
            return
        }

        // Displays each product
        listingsDiv.innerHTML = ""
        listings.forEach(p => {
            const card = document.createElement("button")
            card.addEventListener("click", () => goToProduct(p))
            card.className = "listing-card"

            const firstImg = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null
            
            card.innerHTML = `
                ${firstImg ? `<img src="${firstImg}" width="120" />` : ""}
                <h3>${p.title}</h3>
                <p><strong>$${p.price}</strong></p>
            `
            listingsDiv.appendChild(card)
        })
    } catch (err) {
        console.error("Profile page error:", err)
        showMessage("Unexpected error loading profile.")
    }
})

function goToProduct(listing) {
    window.location.href = `/product/${listing._id}`
}