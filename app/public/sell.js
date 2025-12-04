//TO DO
// Will handle any operations for the sell page
function submitListing(event) {
    event.preventDefault()

    const form = document.getElementById("sellForm")
    const formData = new FormData(form)

    fetch('/sell', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect
        }
    })
}

document.getElementById("listBtn").addEventListener('click', submitListing)