document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadListings();
});

async function loadUserProfile() {
    try {
        const profilePic = document.getElementById('profilePic');
        const slideMenu = document.getElementById('slideMenu');

        profilePic.addEventListener('click', function(event) {
            slideMenu.classList.toggle('open');
            event.stopPropagation();
        });

        // Open/Close menu
        document.addEventListener('click', function(event) {
            if (!slideMenu.contains(event.target) && event.target !== profilePic) {
                slideMenu.classList.remove('open');
            }
        });
        
        // Gets username from backend and displays on profile
        const res = await fetch('/api/user');
        const user = await res.json();
        if (user.username) {
            document.getElementById('usernameDisplay').innerText = `${user.username}'s Listings`;
        }
    } catch (err) {
        console.log("Not logged in");
    }
}

// Fetch and Display Listings
async function loadListings() {
    const container = document.getElementById('userListings');
    
    try {
        // Get user's listings from backend
        const response = await fetch('/api/profile/listings');
        if (!response.ok) throw new Error("Failed to fetch listings");
        
        const listings = await response.json();

        // Checks for no listings
        if (listings.length === 0) {
            container.innerHTML = "<p>You haven't listed anything yet.</p>";
            return;
        }

        container.innerHTML = listings.map(item => {
            const imageUrl = (item.images && item.images.length > 0) 
                ? item.images[0] 
                : '/images/default-placeholder.png'; // Default image

    // Creates listing card for page
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

// Delete Listing
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    try {
        // Send Delete request to Backend
        const response = await fetch(`/api/profile/listings/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Success then reload to update
            window.location.reload();
        } else {
            const data = await response.json();
            alert(data.error || "Failed to delete item.");
        }
    } catch (err) {
        console.error("Delete error:", err);
        alert("An error occurred while deleting.");
    }
}