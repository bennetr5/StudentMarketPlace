// Front end operations for the sell page
function submitListing(event) {
    event.preventDefault()

    // Gets all the new listing's data
    const form = document.getElementById("sellForm")
    const formData = new FormData(form)

    // Submit the data to backend (database) to create a new listing
    fetch('/sell', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        if (data.redirect) {
            // Redirect to users profile
            window.location.href = data.redirect
        }
    })
}

document.getElementById("listBtn").addEventListener('click', submitListing)