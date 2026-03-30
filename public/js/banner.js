let banner = document.getElementById('banner')
if (!getCookie('bannerType')){
    addCookie('bannerType','calc(100vh - 66px)',-1)
    banner.style.height = 'calc(100vh - 66px)';
}
else {
    banner.style.height = getCookie('bannerType');
}