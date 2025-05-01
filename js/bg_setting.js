function initBgSetting() {
  const colorPicker = document.getElementById('bgColorPicker');
  const display = document.getElementById('display-color');
  const hexInput = document.getElementById('hexInput');
  const settingsPanel = document.getElementById('settingsPanel');
  const toggleButton = document.getElementById('toggleSettings');
  const defaultColor = '#cce7ff';

  // 初始化背景顏色
  const savedColor = localStorage.getItem('backgroundColor') || defaultColor;
  document.body.style.backgroundColor = savedColor;
  if (colorPicker) colorPicker.value = savedColor;
  if (display) display.style.backgroundColor = savedColor;

  // 顏色選擇器
  if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      applyColor(color);
    });
  }

  // 預設顏色按鈕
  document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
      const color = button.getAttribute('data-color');
      applyColor(color);
      if (colorPicker) colorPicker.value = color;
    });
  });

  // 手動輸入 HEX 色碼
  if (hexInput) {
    hexInput.addEventListener('input', () => {
      const value = hexInput.value.trim();
      const isValid = /^#[0-9A-Fa-f]{6}$/.test(value);
      if (isValid) {
        applyColor(value);
        if (colorPicker) colorPicker.value = value;
      }
    });
  }

  function applyColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
    if (display) display.style.backgroundColor = color;
  }

  // 顯示 / 隱藏設置面板
  if (toggleButton && settingsPanel) {
    toggleButton.addEventListener('click', () => {
      settingsPanel.classList.toggle('show');
      settingsPanel.classList.remove('fadeout');
    });

    document.addEventListener('click', (e) => {
      const isInside = settingsPanel.contains(e.target) || toggleButton.contains(e.target);
      if (!isInside && settingsPanel.classList.contains('show')) {
        settingsPanel.classList.remove('show');
        settingsPanel.classList.add('fadeout');
      }
    });
  }
}
