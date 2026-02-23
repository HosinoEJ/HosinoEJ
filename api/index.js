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

function getWeightedRandomFromH2() {
  const filePath = path.join(__dirname, '..', 'public', 'md', 'h2.md');
  if (!fs.existsSync(filePath)) return '';

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. 以 "# " 作為分隔符切割（注意處理換行）
  // split 後的第一項可能是空字串，過濾掉並補回 "# " 符號或純文字
  const lines = content.split(/\r?\n/)
                       .map(line => line.trim())
                       .filter(line => line.length > 0);

  if (lines.length === 0) return '';

  // 2. 加權隨機：越往後的索引，權重越大
  const n = lines.length;
  const totalWeight = (n * (n + 1)) / 2;
  let random = Math.random() * totalWeight;

  let selectedLine = lines[n - 1]; // 預設最後一條
  for (let i = 0; i < n; i++) {
    const weight = i + 1;
    if (random < weight) {
      selectedLine = lines[i];
      break;
    }
    random -= weight;
  }

  // 3. 將選中的那一行 Markdown 轉為 HTML 並淨化
  const rawHtml = marked.parse(selectedLine);
  return sanitizeHtml(rawHtml);
}


// 主页路由
app.get('/', (req, res) => {
  const reports = getReports();
  const randomH2Html = getWeightedRandomFromH2();
  res.render('index', { title: '主頁', t: req.t, randomH2Html, reports});
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


app.get('/friends',(req,res) => {//友情鏈接

  let friendsData = { friends: [] };
    try {
        const jsonPath = path.join(__dirname,'..', 'public', 'friends.json');
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        friendsData = JSON.parse(rawData);
    } catch (err) {
        console.error("讀取友鏈史山出錯：", err);
  }

  res.render('friends',{
    title: '友情鏈接',
    t:req.t,
    friends: friendsData.friends
  })
})


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
