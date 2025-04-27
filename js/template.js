fetch('../template.html')
  .then(response => response.text())
  .then(data => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    // 缓存所有模板内容
    const templates = new Map();
    tempDiv.querySelectorAll('template').forEach(template => {
      templates.set(template.id, template.content.cloneNode(true));
    });

    // 遍历页面中的元素并插入对应的模板
    templates.forEach((content, id) => {
      document.querySelectorAll(`.${id}`).forEach(el => 
        el.appendChild(content.cloneNode(true))  // 克隆缓存的内容
      );
    });


    /*這一串代碼是ai解決template和cd_setting不兼容問題的代碼*/
    /*================================================================*/
    // 模板加載完成後初始化背景設置
    if (document.querySelector('#bgColorPicker')) {
      initBgSetting();
    }
  });

function initBgSetting() {
  const colorPicker = document.getElementById('bgColorPicker');
  const settingsPanel = document.getElementById('settingsPanel');
  const toggleButton = document.getElementById('toggleSettings');
  const defaultColor = '#cce7ff';

  // 初始化背景色
  window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('backgroundColor') || defaultColor;
    document.body.style.backgroundColor = savedColor;
    colorPicker.value = savedColor;
  });

  // 顏色選擇器
  colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    setBackgroundColor(selectedColor);
  });

  // 預設色選擇
  document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
      const selectedColor = button.getAttribute('data-color');
      setBackgroundColor(selectedColor);
      colorPicker.value = selectedColor;
    });
  });

  function setBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
  }

  // 顯示面板
  toggleButton.addEventListener('click', () => {
    if (!settingsPanel.classList.contains('show')) {
      settingsPanel.classList.remove('fadeout');
      settingsPanel.classList.add('show');
    }
  });

  // 點擊外部區域關閉面板
  document.addEventListener('click', (e) => {
    const isClickInside = settingsPanel.contains(e.target) || toggleButton.contains(e.target);
    if (!isClickInside && settingsPanel.classList.contains('show')) {
      settingsPanel.classList.remove('show');
      settingsPanel.classList.add('fadeout');
    }
  });
}
/*=================================================================*/

  (function () {
    const originalLog = console.log;
    window.hsnej = function () {window.location.href = 'hsnej.html';};
    window.info = function () {alert("星野栄治 © 2025｜GNU LICENSEによって転載してください");
    };
    console.log = function (message) { originalLog.apply(console, arguments);
    };
  
  })(
  
  );