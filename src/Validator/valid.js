
function validValue(value){
    if( typeof value == undefined || value==null || value.trim().length==0 || typeof value != String ){
        return false
    }
    return true 
}

function checkName(value){
    const name = /^[a-zA-Z](1,30)$/
   return name.test(value)
}

function checkEmail(email){
    const RegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-)+@ [a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]{2,5})*$/
    return RegexEmail.test(email)
}

function mobileNum(value){
    const name = /^[0-9](10)$/
   return name.test(value)
}

// [(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]

function checkUrl(url){
    const regexLink = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
}


