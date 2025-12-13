// Sets word count limit for description
const chars = document.getElementById("charCount")
const desc = document.getElementById("itemDescID")
desc.addEventListener("input", function () {
    chars.innerText = desc.value.length + "/200"
    if (desc.value.length > 200) {
        chars.style.color = "red"
    }
    else {
        chars.style.color = "black"
    }
})

// Menu bar
const profilePic = document.getElementById('profilePic');
const slideMenu = document.getElementById('slideMenu');

profilePic.addEventListener('click', function (event) {
    slideMenu.classList.toggle('open');
    event.stopPropagation();
});

document.addEventListener('click', function (event) {
    if (!slideMenu.contains(event.target) && event.target !== profilePic) {
        slideMenu.classList.remove('open');
    }
});

// Submits form data to backend to make listing
function submitListing(event) {
    event.preventDefault()

    // Gets all form data
    const form = document.getElementById("sellForm")
    const formData = new FormData(form)

    // Fetch req to backend
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