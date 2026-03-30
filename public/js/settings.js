function settingDivOpen(){
    let divStatus = document.getElementById('settingsDiv')
    divStatus.style.display = (divStatus.style.display === 'none') ? 'flex' : 'none';
}
function settingBannerStyle(half){
    let banner = document.getElementById('banner')
    banner.style.height = (half === 'half') ? 'calc((100vh - 66px) / 2)' : 'calc(100vh - 66px)';
    addCookie('bannerType',banner.style.height,-1)
}