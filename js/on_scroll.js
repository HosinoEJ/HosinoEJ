document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('[data-animate-on-scroll]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // 只觸發一次就停止觀察
        }
      });
    }, {
      threshold: 0.1
    });

    targets.forEach(el => observer.observe(el));
  });