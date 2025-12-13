async function loadProduct() {
    const parts = window.location.pathname.split('/')
    const id = parts[2]

    if (!id) window.location.href = '/home';

    try {
        // Get product details from backend
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        if (data.error) {
            document.body.innerHTML = "<h1>Product not found</h1>";
            return;
        }

        // Populate fields
        document.getElementById('prodTitle').innerText = data.title
        document.getElementById('prodPrice').innerText = `$${data.price}`
        document.getElementById('prodType').innerText = data.type
        document.getElementById('prodDesc').innerText = data.description
        
        // Gets seller email for contacting to buy
        if (data.seller && data.seller.email) {
            const emailLink = document.getElementById('sellerEmail');
            emailLink.innerText = " Contact the Seller"
            emailLink.href = `mailto:${data.seller.email}`;
        } else {
            document.getElementById('sellerEmail').innerText = "Contact info unavailable";
        }

        // Loads images for listing
        const imgContainer = document.getElementById('imageContainer');
        if (data.images && data.images.length > 0) {
            // Just showing the first image for now
            imgContainer.innerHTML = `<img src="${data.images[0]}" style="max-width: 100%; max-height: 400px;">`;
        } else {
            imgContainer.innerHTML = `<p>No image available</p>`;
        }

    } catch (err) {
        console.error(err);
    }
}

loadProduct();