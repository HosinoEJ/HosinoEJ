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




const colorInput = document.getElementById('bgColorPicker');
  const display = document.getElementById('display-color');

  colorInput.addEventListener('input', function() {
    display.style.backgroundColor = this.value;
  });




  const hexInput = document.getElementById('hexInput');

  // 當用戶輸入 16 進制色碼
  hexInput.addEventListener('input', () => {
    const value = hexInput.value.trim();
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);
    if (isValidHex) {
      setBackgroundColor(value);
      colorPicker.value = value;
    }
  });
  

  if (isValidHex) {//ERROR Color Code
    setBackgroundColor(value);
    colorPicker.value = value;
    hexInput.classList.remove('invalid');
  } else {
    hexInput.classList.add('invalid');
  }
  