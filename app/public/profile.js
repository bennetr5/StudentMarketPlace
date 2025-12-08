document.addEventListener("DOMContentLoaded", async () => {
    const usernameHeader = document.getElementById("usernameDisplay")
    const listingsDiv = document.getElementById("userListings")

    const showMessage = (msg) => {
        listingsDiv.innerHTML = `<p>${msg}</p>`
    }

    try {
        // 1) Get current user
        const userRes = await fetch("/api/user")
        if (!userRes.ok) {
            showMessage("Error loading user.")
            console.error("User fetch failed:", userRes.status)
            return
        }
        const user = await userRes.json()
        usernameHeader.textContent = `${user.username}'s Listings`

        // 2) Get this user's product listings
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

        // 3) Render each product similar to home
        listingsDiv.innerHTML = ""
        listings.forEach(p => {
            const card = document.createElement("div")
            card.className = "listing-card"

            const firstImg = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null

            card.innerHTML = `
                ${firstImg ? `<img src="${firstImg}" width="120" />` : ""}
                <h3>${p.title}</h3>
                <p>${p.description || ""}</p>
                <p><strong>$${p.price}</strong></p>
            `

            listingsDiv.appendChild(card)
        })
    } catch (err) {
        console.error("Profile page error:", err)
        showMessage("Unexpected error loading profile.")
    }
})