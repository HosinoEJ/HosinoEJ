document.addEventListener('click',(e) =>{
    const goLink = document.querySelectorAll('.goLink');
    const mtf = document.getElementsByClassName('color-bar')
    const target = e.target.closest('a,button');
    if(!target) return;
    e.preventDefault();
    if (Array.from(goLink).includes(target)) return;
    const href = target.href; // 取得連結地址
    for (const bar of mtf) {
        bar.style.animation = 'none';// 強制瀏覽器重新渲染
        bar.offsetHeight; // 讀取屬性觸發 reflow
        bar.style.animation = 'slide 1.2s ease forwards reverse';//倒放
    }
    setTimeout(() => {
        if (href) window.location.href = href;
        else console.log('button 點擊，可在這裡觸發其他動作');
    }, 1200); // 與動畫時間一致
});