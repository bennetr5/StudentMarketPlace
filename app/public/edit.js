// Get product id
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Gets data from current listing
async function loadData() {
    const response = await fetch(`/api/product?id=${productId}`);
    const product = await response.json();

    if (product.error) {
        alert("Product not found");
        window.location.href = '/profile';
    }

    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('type').value = product.type;
    document.getElementById('description').value = product.description;
}

// Updates product info
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        type: document.getElementById('type').value,
        description: document.getElementById('description').value
    };

    // Fetches backend to update information
    const res = await fetch(`/api/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    if (res.ok) {
        alert("Listing updated!");
        window.location.href = '/profile';
    } else {
        alert("Failed to update.");
    }
});

loadData();