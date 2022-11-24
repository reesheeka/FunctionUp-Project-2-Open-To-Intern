const validValue = function (value) {
    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length === 0) {
        return false
    } else {
        return true
    }
}

function checkEmail(email) {
    const RegexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return RegexEmail.test(email)
}

function mobileNum(value) {
    const name = /^[0-9]{10}$/
    return name.test(value)
}



module.exports = { checkEmail, mobileNum, validValue }