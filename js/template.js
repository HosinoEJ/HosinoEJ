fetch('../template.html')
  .then(response => response.text())
  .then(data => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    // 建立模板 Map
    const templates = new Map();
    tempDiv.querySelectorAll('template').forEach(template => {
      templates.set(template.id, template.content.cloneNode(true));
    });

    // 插入模板內容
    templates.forEach((content, id) => {
      document.querySelectorAll(`.${id}`).forEach(el => {
        content.childNodes.forEach(node => {
          if (node.nodeName === 'SCRIPT') {
            const newScript = document.createElement('script');
            newScript.textContent = node.textContent;
            [...node.attributes].forEach(attr =>
              newScript.setAttribute(attr.name, attr.value)
            );
            el.appendChild(newScript);
          } else {
            el.appendChild(node.cloneNode(true));
          }
        });
      });
    });

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
      window.location.href = 'hsnej.html';
  };
  

    window.info = function () {alert("星野栄治 © 2025｜GNU LICENSEによって転載してください");
    };


    console.log = function (message) { originalLog.apply(console, arguments);
    };
  
  })
  (
  
  );