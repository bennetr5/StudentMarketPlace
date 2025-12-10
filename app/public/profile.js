document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadListings();
});

// 1. Fetch User Info (Optional: updates the name in the nav)
async function loadUserProfile() {
    try {
        const res = await fetch('/api/user');
        const user = await res.json();
        if (user.username) {
            document.getElementById('usernameDisplay').innerText = `${user.username}'s Listings`;
        }
    } catch (err) {
        console.log("Not logged in");
    }
}

// 2. Fetch and Display Listings
async function loadListings() {
    const container = document.getElementById('userListings');
    
    try {
        const response = await fetch('/api/profile/listings');
        if (!response.ok) throw new Error("Failed to fetch listings");
        
        const listings = await response.json();

        if (listings.length === 0) {
            container.innerHTML = "<p>You haven't listed anything yet.</p>";
            return;
        }

        // Generate HTML for each listing
        container.innerHTML = listings.map(item => {
            // Handle image path (use the first image if available)
            const imageUrl = (item.images && item.images.length > 0) 
                ? item.images[0] 
                : '/images/default-placeholder.png'; // Fallback image

    // Inside loadListings()...
            return `
                <div class="listing-card" style="border: 1px solid #ccc; padding: 10px; margin: 10px; display: inline-block; vertical-align: top; width: 200px;">
                    <img src="${imageUrl}" alt="${item.title}" style="width: 100%; height: 150px; object-fit: cover;">
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price}</p>
        
                    <a href="/edit?id=${item._id}">
                    <button style="background-color: blue; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px;">
                    Edit
                    </button>
                    </a>

                    <button onclick="deleteItem('${item._id}')" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">
                         Delete
                    </button>
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Error loading listings.</p>";
    }
}

// 3. Handle Delete Action
// This function is called when the red 'Delete' button is clicked
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    try {
        // Send DELETE request to the server
        const response = await fetch(`/api/profile/listings/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Success: Reload the page to see changes
            window.location.reload();
        } else {
            // Error: Show message from server
            const data = await response.json();
            alert(data.error || "Failed to delete item.");
        }
    } catch (err) {
        console.error("Delete error:", err);
        alert("An error occurred while deleting.");
    }
}