function initBgSetting() {
  const colorPicker = document.getElementById('bgColorPicker');
  const display = document.getElementById('display-color');
  const hexInput = document.getElementById('hexInput');
  const settingsPanel = document.getElementById('settingsPanel');
  const toggleButton = document.getElementById('toggleSettings');

  const defaultColor = '#cce7ff';
  const bgTypeKey = 'backgroundType';
  const bgImageKey = 'backgroundImage';
  const bgColorKey = 'backgroundColor';

  let randomImgTimer = null;
  let nextRandomImgUrl = null;
  let randomImgGenerated = false;

  const savedType = localStorage.getItem(bgTypeKey) || 'color';
  const savedColor = localStorage.getItem(bgColorKey) || defaultColor;
  const savedImage = localStorage.getItem(bgImageKey);

  // === 設定背景顏色 ===
  function setBgColor(color) {
    Object.assign(document.body.style, {
      backgroundImage: '',
      backgroundColor: color,
      backgroundSize: '',
      backgroundPosition: '',
      backgroundRepeat: '',
      backgroundAttachment: '',
      color: '#000000',
      textShadow: '0 0 #00000070'
    });
    if (display) display.style.backgroundColor = color;
    document.querySelectorAll('a').forEach(a => {
      a.style.color = '';
      a.style.textShadow = '';
    });
  }

  // === 設定背景圖片 ===
  function setBgImage(url) {
    Object.assign(document.body.style, {
      backgroundImage: `url('${url}')`,
      backgroundColor: '',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      color: '#ffffff',
      textShadow: '2px 2px #00000070'
    });
    if (display) display.style.backgroundColor = '';
    document.querySelectorAll('a').forEach(a => {
      a.style.color = '#ffffff';
      a.style.textShadow = '2px 2px #00000070';
    });
  }

  // === 套用顏色（並儲存） ===
  function applyColor(color) {
    setBgColor(color);
    localStorage.setItem(bgColorKey, color);
    localStorage.setItem(bgTypeKey, 'color');
    localStorage.removeItem(bgImageKey);
  }

  // === 圖片縮圖選中邏輯 ===
  function selectThumbnail(img) {
    document.querySelectorAll('.bg-image-thumb').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
  }

  // === 背景輪播邏輯 ===
  function fadeToNextRandomImg(img, url) {
    img.style.transition = 'opacity 0.8s';
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = url;
      img.dataset.generated = '1';
      img.setAttribute('data-bg-image', url);
      img.style.opacity = '1';
      setBgImage(url);
      localStorage.setItem(bgTypeKey, 'image');
      localStorage.setItem(bgImageKey, url);
      preloadNextRandomImg(img);
    }, 800);
  }

  function preloadNextRandomImg(img) {
    const preload = new Image();
    preload.onload = () => {
      nextRandomImgUrl = preload.src;
      randomImgTimer = setTimeout(() => {
        fadeToNextRandomImg(img, nextRandomImgUrl);
      }, 10000);
    };
    preload.src = `https://img.youliss.net/pcapi.php?t=${Date.now() + 1}`;
  }

  function startRandomImgSequence(img) {
    const url = `https://img.youliss.net/pcapi.php?t=${Date.now()}`;
    img.src = url;
    img.dataset.generated = '1';
    img.setAttribute('data-bg-image', url);
    img.style.opacity = '1';
    clearTimeout(randomImgTimer);
    preloadNextRandomImg(img);
  }

  // === 初始化背景 ===
  if (savedType === 'image' && savedImage) {
    setBgImage(savedImage);
    colorPicker && (colorPicker.value = defaultColor);
  } else {
    setBgColor(savedColor);
    colorPicker && (colorPicker.value = savedColor);
  }

  // === 顏色選擇器邏輯 ===
  colorPicker?.addEventListener('input', e => {
    applyColor(e.target.value);
  });

  // === 預設顏色按鈕邏輯 ===
  document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
      const color = button.getAttribute('data-color');
      applyColor(color);
      colorPicker && (colorPicker.value = color);
    });
  });

  // === 圖片點擊邏輯 ===
  document.querySelectorAll('.bg-image-thumb').forEach(img => {
    img.addEventListener('click', () => {
      const isRandom = img.src.includes('img.youliss.net/pcapi.php');
      const imgUrl = img.getAttribute('data-bg-image');

      if (isRandom && !img.dataset.generated) {
        startRandomImgSequence(img);
      }

      setBgImage(imgUrl);
      localStorage.setItem(bgTypeKey, 'image');
      localStorage.setItem(bgImageKey, imgUrl);
      selectThumbnail(img);
    });
  });

  // === HEX 色碼手動輸入邏輯 ===
  hexInput?.addEventListener('input', () => {
    const value = hexInput.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      applyColor(value);
      colorPicker && (colorPicker.value = value);
    }
  });

  // === 設定面板開關邏輯 ===
  if (toggleButton && settingsPanel) {
    toggleButton.addEventListener('click', () => {
      settingsPanel.classList.toggle('show');
      settingsPanel.classList.remove('fadeout');

      if (!randomImgGenerated) {
        const randomImg = document.querySelector('.bg-image-thumb[src*="img.youliss.net/pcapi.php"]');
        if (randomImg) startRandomImgSequence(randomImg);
        randomImgGenerated = true;
      }
    });

    document.addEventListener('click', e => {
      if (!settingsPanel.contains(e.target) && !toggleButton.contains(e.target)) {
        if (settingsPanel.classList.contains('show')) {
          settingsPanel.classList.remove('show');
          settingsPanel.classList.add('fadeout');
          clearTimeout(randomImgTimer);
          randomImgTimer = null;
        }
      }
    });
  }
}
