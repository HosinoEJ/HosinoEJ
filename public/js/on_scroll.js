document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('[data-animate-on-scroll-Left], [data-animate-on-scroll-Right],[animate-gradient]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // 只觸發一次就停止觀察
        }
      });
    }, {
      rootMargin: '-100px -100px -100px -100px', // 提前100px觸發
  threshold: 0
    });

    targets.forEach(el => observer.observe(el));
  });

// 解讀：
// 這段程式碼會在 DOM 載入後，尋找所有帶有 data-animate-on-scroll-Left 或 data-animate-on-scroll-Right 屬性的元素。
// 使用 IntersectionObserver 監控這些元素是否進入視窗（可視區域）。
// 當元素進入視窗（isIntersecting 為 true）時，會自動加上 'visible' class，並停止觀察該元素（只觸發一次）。
// threshold: 0.1 表示元素有 10% 進入可視區域就會觸發。
// 這常用於滾動動畫或進場效果。


// 監控所有動畫元素，進入視窗加 visible，離開移除 visible

function handleAnimateOnScroll() {
  const animatedElements = document.querySelectorAll(
    '[data-animate-on-scroll-Left], [data-animate-on-scroll-Right], [animate-gradient]'
  );
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', handleAnimateOnScroll);
window.addEventListener('resize', handleAnimateOnScroll);
window.addEventListener('DOMContentLoaded', handleAnimateOnScroll);
