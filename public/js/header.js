(function() {
// targetElement 可以改成要加 class 的元素 (例如 document.body)
const targetElement = document.body;
let lastScrollY = window.scrollY;
let ticking = false;
// 最小位移閾值（避免輕微抖動觸發）
const DELTA = 5;

function onScroll() {
    // 節流：避免每個 scroll event 都跑計算
    if (!ticking) {
    window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY;

        if (Math.abs(diff) >= DELTA) {
        if (diff > 0 && currentY > 0) {
            // 向下滑
            targetElement.classList.add('scrolling-down');
        } else if (diff < 0) {
            // 向上滑
            targetElement.classList.remove('scrolling-down');
        }
        lastScrollY = currentY;
        }

        ticking = false;
    });
    ticking = true;
    }
}

// 使用被動 (passive) 監聽器改善滾動效能
window.addEventListener('scroll', onScroll, { passive: true });

// 可選：在頁面載入或 resize 時重置狀態
window.addEventListener('resize', () => {
    lastScrollY = window.scrollY;
}, { passive: true });

// 如果你想在接近頂部時一定移除 class（例如滾到 50px 內視為『在頂部』）
function checkTopReset() {
    if (window.scrollY <= 50) {
        targetElement.classList.remove('scrolling-down');
    }
}
window.addEventListener('scroll', checkTopReset, { passive: true });
})();