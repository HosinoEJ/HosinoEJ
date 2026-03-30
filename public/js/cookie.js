//ADD Cookie
function addCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

//GET Cookie
function getCookie(name) {
    let cname = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
    }
    return "";
}

//DEL Cookie
function delCookie(name) {
    setCookie(name, "", -1);
    return true
}