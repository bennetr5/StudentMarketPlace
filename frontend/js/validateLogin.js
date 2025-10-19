function validate(f) {
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