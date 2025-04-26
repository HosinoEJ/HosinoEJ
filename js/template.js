// 加载模板
fetch('../template.html')
  .then(response => response.text())
  .then(data => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    // 缓存所有模板内容（原始内容，不clone）
    const templates = new Map();
    tempDiv.querySelectorAll('template').forEach(template => {
      templates.set(template.id, template.content);  // 不 clone
    });

    // 遍历页面中的元素并插入对应的模板
    templates.forEach((content, id) => {
      document.querySelectorAll(`.${id}`).forEach(el => {
        if (el.children.length === 0) {  // 防止重复插入
          el.appendChild(content.cloneNode(true));  // 这里再 clone
        }
      });
    });
  });


(function () {
  const originalLog = console.log;
  window.hsnej = function () {window.location.href = 'hsnej_cd.html';};
  window.info = function () {alert("星野栄治 © 2025｜GNU LICENSEによって転載してください");
  };
  console.log = function (message) { originalLog.apply(console, arguments);
  };

})(

);
