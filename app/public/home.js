// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('#filterIcon')) {
        var dropdowns = document.getElementsByClassName("filter-container")[0].getElementsByTagName("div")[0];
        if (dropdowns.classList.contains('show')) {
            dropdowns.classList.remove('show');
        }
    }
}

let allListings = [];

// Colors for listing backgrounds
const palette = [
    '#ffffff', 
    '#e0f7fa',  
    '#fff3e0'   
];

document.addEventListener('DOMContentLoaded', async () => {
    await loadListings();

    // Toggle menu
    const profilePic = document.getElementById('profilePic');
    const slideMenu = document.getElementById('slideMenu');

    profilePic.addEventListener('click', function (event) {
        slideMenu.classList.toggle('open');
        event.stopPropagation();
    });

    // User opens/closes menu
    document.addEventListener('click', function (event) {
        if (!slideMenu.contains(event.target) && event.target !== profilePic) {
            slideMenu.classList.remove('open');
        }
    });

    // User opens/closes filters
    document.getElementById('filterIcon').addEventListener('click', () => {
        document.getElementById('filterDropdown').classList.toggle('show');
    });

    // Search for listings
    document.getElementById('searchBtn').addEventListener('click', runSearch);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') runSearch();
    });
});

function runSearch() {
    // Gets search from search bar
    const query = document.getElementById('searchInput').value.toLowerCase();
    // Gets all listings if query was its title
    const filtered = allListings.filter(item =>
        item.title.toLowerCase().includes(query)
    );
    displayListings(filtered);
}

// Filters listings ***NOT WORKING***
function filterListings(type) {
    document.getElementById('filterDropdown').classList.remove('show');

    if (type === 'All') {
        displayListings(allListings);
    } else {
        const filtered = allListings.filter(item => item.type === type);
        displayListings(filtered);
    }
}

// Loads all listings
async function loadListings() {
    try {
        // Fetches all listings from backend
        const response = await fetch('/home/listings');
        allListings = await response.json();
        displayListings(allListings);
    } catch (err) {
        console.error("Failed to load listings");
    }
}

// Display listings logic
function displayListings(listings) {
    // Container for listing to go into
    const container = document.getElementById('listingsContainer');
    container.innerHTML = '';

    // Output for no listings
    if (listings.length === 0) {
        container.innerHTML = '<h3>No listings available at this time</h3>';
        return;
    }

    // Loops through each listing
    listings.forEach((item, index) => {
        const imageUrl = (item.images && item.images.length > 0) ? item.images[0] : '/default.png';

        // Chooses background color for listing
        const cardColor = palette[index % palette.length];

        // Listings details
        const card = `
                <div class="card" onclick="window.location.href='/product/${item._id}'" style="background-color: ${cardColor};">
                    <img src="${imageUrl}">
                    <div>
                        <h3 style="margin: 0 0 5px 0;">${item.title}</h3>
                        <p style="font-weight: bold; color: #2ecc71; margin: 0;">$${item.price}</p>
                        <p style="color: grey; font-size: 0.9em; margin-top: 5px;">${item.type}</p>
                    </div>
                </div>
            `;
        // Add listing details to container
        container.innerHTML += card;
    });
}