const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const serverless = require('serverless-http');
// 引入DOMPurify和jsdom用于HTML净化
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// 初始化DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'views'));

// 自定义marked渲染器
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  return `
    <figure>
      <img src="${href}" alt="${text}">
      <figcaption>${text}</figcaption>
    </figure>
  `;
};

// 配置marked选项（移除了sanitize）
marked.setOptions({
  renderer,
  mangle: false,
  headerIds: false
});

// 添加HTML净化工具函数
const sanitizeHtml = (html) => {
  return purify.sanitize(html);
};

// 预处理Markdown
app.use((req, res, next) => {
  res.locals.renderMarkdown = (name) => {
    const filePath = path.join(__dirname, '..', 'public', 'md', `${name}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const rawHtml = marked.parse(content);
      // 净化HTML
      return sanitizeHtml(rawHtml);
    }
    return '';
  };
  next();
});

// 共用函数 - 获取报告
function getReports() {
  const protDir = path.join(__dirname, '..', 'public', 'prot');
  if (!fs.existsSync(protDir)) return [];
  
  const files = fs.readdirSync(protDir).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const filenames = filename.replace('.md', '');
    const [language, time, ...titleArr] = filenames.split('.');
    const title = titleArr.join('.');
    const content = fs.readFileSync(path.join(protDir, filename), 'utf-8');
    const rawHtml = marked.parse(content);
    
    return { 
      language, 
      time, 
      title, 
      filenames, 
      // 净化HTML
      html: sanitizeHtml(rawHtml) 
    };
  });
}

// 主页路由
app.get('/', (req, res) => {
  const reports = getReports();
  res.render('index', { title: '主頁', t: req.t, reports });
});

// 报告列表路由（合并重复定义）
app.get('/port-list', (req, res) => {
  const reports = getReports();
  res.render('port-list', { reports, t: req.t });
});

// 报告页面路由
app.get('/port', (req, res) => {
  const reports = getReports();
  res.render('port', { 
    reports, 
    title: '文章列表',
    t: req.t
  });
});

// 单个报告路由
app.get('/port/:id', (req, res) => {
  const mdName = req.params.id;
  const protDir = path.join(__dirname, '..', 'public', 'prot');
  const mdPath = path.join(protDir, `${mdName}.md`);
  
  if (!fs.existsSync(mdPath)) {
    return res.status(404).send('文章不存在');
  }
  
  const content = fs.readFileSync(mdPath, 'utf-8');
  const [language, time, ...titleArr] = mdName.split('.');
  const title = titleArr.join('.');
  const rawHtml = marked.parse(content);
  
  const report = {
    language, 
    time, 
    title,
    // 净化HTML
    html: sanitizeHtml(rawHtml)
  };
  
  res.render('port', { reports: [report], t: req.t });
});

// 启动服务器
if (process.env.VERCEL_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('SERVER IS STARTED AT: http://localhost:3000');
  });
}

module.exports = app;
module.exports.handler = serverless(app);
