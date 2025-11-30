// TO DO
// Will handle any operations for the sell page
function listItem(event) {
    event.preventDefault()

    const title = document.getElementById('itemNameID').value
    const description = document.getElementById('itemDescID').value
    const productType = document.getElementById('typeID').value
    const price = document.getElementById('priceID').value

    fetch('/sell', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, productType, price })
    })
    .then(res => res.json())
}

document.getElementById("listBtn").addEventListener('click', listItem)