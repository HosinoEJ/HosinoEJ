function initBgSetting() {
  const colorPicker = document.getElementById('bgColorPicker');
  const display = document.getElementById('display-color');
  const hexInput = document.getElementById('hexInput');
  const settingsPanel = document.getElementById('settingsPanel');
  const toggleButton = document.getElementById('toggleSettings');
  const defaultColor = '#cce7ff';
  const bgTypeKey = 'backgroundType';
  const bgImageKey = 'backgroundImage';

  // 新增：初始化背景（圖片或顏色）
  const savedType = localStorage.getItem(bgTypeKey) || 'color';
  const savedColor = localStorage.getItem('backgroundColor') || defaultColor;
  const savedImage = localStorage.getItem(bgImageKey);

  function setBgColor(color) {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = color;
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundAttachment = '';
    if (display) display.style.backgroundColor = color;
    document.body.style.color = '#000000';
    document.body.style.textShadow = "0 0 #00000070";
    // 讓所有 a 標籤恢復黑色
    document.querySelectorAll('a').forEach(a => {
      a.style.color = '';
      a.style.textShadow = '';
    });
  }

  //=======================這個是圖片顯示設置！！！！===============================//
  function setBgImage(img) {
    document.body.style.backgroundImage = `url('${img}')`;
    document.body.style.backgroundColor = '';
    document.body.style.backgroundSize = 'cover'; // 裁切且放大
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.color = '#ffffff';
    document.body.style.textShadow = "2px 2px #00000070";
    // 讓所有 a 標籤也變白色
    document.querySelectorAll('a').forEach(a => {
      a.style.color = '#ffffff';
      a.style.textShadow = "2px 2px #00000070";
    });
    if (display) display.style.backgroundColor = '';
  }
  //===============================================================================//
  // 初始化
  if (savedType === 'image' && savedImage) {
    setBgImage(savedImage);
    if (colorPicker) colorPicker.value = defaultColor;
  } else {
    setBgColor(savedColor);
    if (colorPicker) colorPicker.value = savedColor;
  }

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

  // 新增：圖片選擇
  document.querySelectorAll('.bg-image-thumb').forEach(img => {
    img.addEventListener('click', () => {
      // 判斷是否為隨機圖片（用 src 判斷，避免 data-bg-image 被覆蓋後失效）
      if (img.src.includes('img.youliss.net/pcapi.php')) {
        // 產生新隨機圖片連結
        const randomUrl = 'https://img.youliss.net/pcapi.php?t=' + Date.now();
        img.src = randomUrl;
        img.setAttribute('data-bg-image', randomUrl);
        setBgImage(randomUrl);
        localStorage.setItem(bgTypeKey, 'image');
        localStorage.setItem(bgImageKey, randomUrl);
        if (display) display.style.backgroundColor = '';
        // 取消其他縮圖選中
        document.querySelectorAll('.bg-image-thumb').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        return;
      }
      // 其他圖片
      const imgUrl = img.getAttribute('data-bg-image');
      setBgImage(imgUrl);
      localStorage.setItem(bgTypeKey, 'image');
      localStorage.setItem(bgImageKey, imgUrl);
      if (display) display.style.backgroundColor = '';
      // 取消其他縮圖選中
      document.querySelectorAll('.bg-image-thumb').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
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
    setBgColor(color);
    localStorage.setItem('backgroundColor', color);
    localStorage.setItem(bgTypeKey, 'color');
    localStorage.removeItem(bgImageKey);
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
