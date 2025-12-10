async function loadProduct() {
    const parts = window.location.pathname.split('/')
    const id = parts[2]

    if (!id) window.location.href = '/home';

    try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        console.log(data)

        if (data.error) {
            document.body.innerHTML = "<h1>Product not found</h1>";
            return;
        }

        // Populate fields
        document.getElementById('prodTitle').innerText = data.title
        document.getElementById('prodPrice').innerText = `$${data.price}`
        document.getElementById('prodType').innerText = data.type
        document.getElementById('prodDesc').innerText = data.description
        
        // Handle Seller Email
        if (data.seller && data.seller.email) {
            const emailLink = document.getElementById('sellerEmail');
            emailLink.innerText = data.seller.email;
            emailLink.href = `mailto:${data.seller.email}`;
        } else {
            document.getElementById('sellerEmail').innerText = "Contact info unavailable";
        }

        // Handle Image
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