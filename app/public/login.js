// Handles login operations (auth in seperate file eventually)
function validateLogin(f) {
    const email = f.email.value
    const password = f.password.value

    if (email.substring(email.length-8) !== "@pfw.edu") {
        alert("Enter a pfw email")
        return false
    }
    else if (password.length < 6) {
        alert("Enter a password greater than 5 characters")
        return false
    }
    return true
}

function validateListing(f) {
    const name = f.itemName.value
    const desc = f.itemDesc.value
    const type = f.itemType.value
    const price = f.price.value

    if (name === "") {
        alert("Enter a Product Name")
        return false
    }
    else if (desc === "" || desc.length > 200) {
        alert("Description cannot be empty or over 200 characters ")
        return false
    }
    else if (price === "") {
        alert("Enter a Price")
        return false
    }
    else if (type === "") {
        if (confirm("You haven't selected a product type, proceding will select it as \"other\"")) {
            f.typeID.value = "other"
        }
        else { return false }
    }
    return true
}