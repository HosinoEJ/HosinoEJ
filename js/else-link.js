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



//===========================================================================================
            // 檢查瀏覽器的色彩模式
function checkColorMode() {
  const colorDiv = document.getElementById('link_animate');
  
  // 如果瀏覽器是深色模式
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorDiv.style.backgroundColor = '#333'; // 深色模式背景顏色
    colorDiv.style.color = '#fff'; // 深色模式文字顏色
  } else {
    colorDiv.style.backgroundColor = '#fff'; // 淺色模式背景顏色
    colorDiv.style.color = '#000'; // 淺色模式文字顏色
  }
}

// 初始檢查色彩模式
checkColorMode();

// 監聽色彩模式變化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkColorMode);