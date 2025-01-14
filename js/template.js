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
  });


  //这是一个彩蛋，有时可以当做一个“指令集”
  (function() {
    const originalLog = console.log;
  
    // 拦截 console.log，检查是否输入特定指令
    console.log = function(message) {
      if (typeof message === 'string' && message === 'GotouEijiro!') {
        // 执行重定向
        window.location.href = 'gtejr_cd.html';
      }
      if (typeof message === 'string' && message === 'blog-template') {
        // 执行重定向
        window.location.href = 'blig_template.html';
      }
      // 调用原始的 console.log 确保正常日志输出
      originalLog.apply(console, arguments);
    };
  })();
  