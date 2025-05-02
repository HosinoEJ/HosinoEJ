const overlay = document.getElementById('link_animate');
    
  document.querySelectorAll('[data-animate-link]').forEach(link => {
              link.addEventListener('click', function (event) {
                event.preventDefault();
                const href = this.href;
            
                // 啟用動畫
                overlay.classList.add('active');
            
                // 動畫結束後跳轉
                setTimeout(() => {
                  window.location.href = href;
                }, 500);
              });
            });
            
            // ⭐ 當頁面重新載入（例如回退）時，移除 active 類名
            window.addEventListener('pageshow', (event) => {
              overlay.classList.remove('active');
            });