document.addEventListener('click',(e) =>{
    const goLink = document.querySelectorAll('.LinkNoAmi');
    const mtf = document.getElementsByClassName('color-bar');
    const target = e.target.closest('a,button');
    const main = document.querySelector('.main');
    if(!target) return;
    e.preventDefault();
    if (Array.from(goLink).includes(target)) return;
    const href = target.href; // 取得連結地址
    if(main != null){
        main.style.animation = 'none';
        main.offsetHeight;
        main.style.animation = 'fadeIn 1s ease forwards reverse';
    }
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



function playEnterAnimation() {
    const bars = document.querySelectorAll('.color-bar');
    bars.forEach(bar => {
        bar.style.animation = 'none';
        void bar.offsetHeight;
        bar.style.animation = 'slide 1.5s ease forwards';
    });

    // 內容淡入
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.animation = 'none';
        void mainContent.offsetHeight;
        mainContent.style.animation = 'fadeIn 1s ease-out forwards';
    }
}
// 監聽返回頁面事件
window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        playEnterAnimation();
    }
});
