fetch('../template.html')
.then(data => {
  // 初始化背景設定（如果有對應元件）
  if (document.querySelector('#bgColorPicker')) {
    initBgSetting(); // 定義於 bg_setting.js
  }

});


(function () {
  const originalLog = console.log;
  
  window.hsnej = function () {
    // 存储元数据到 sessionStorage
    sessionStorage.setItem('redirectMetadata', JSON.stringify({
        source: 'custom_page',
        timestamp: Date.now(),
    }));
    // 跳转到 hsnej.html
    window.location.href = 'port/hsnej';
};


  window.info = function () {alert("星野栄治 © 2025｜GNU LICENSEによって転載してください");
  };


  console.log = function (message) { originalLog.apply(console, arguments);
  };

})
(

);