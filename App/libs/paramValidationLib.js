let Email = (email)=>{
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(emailRegex)){
        return email
    } else {
        return false;
    }
}

let Password = (password)=>{
    let passwordRegex = /^[A-Za-z0-9]\w{7,}$/
    if(password.match(passwordRegex)){
        return password
    } else {
        return false;
    }
}

module.exports = {
    Email : Email,
    Password : Password
}