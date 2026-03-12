const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'setting'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- 全局配置 ---
const DATA_PATH = path.join(__dirname, 'data.json');
const PROT_DIR = path.join(__dirname, '..', 'public', 'prot');

const getPortTags = () => {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
};

// --- 輔助邏輯 ---

// 找出哪些檔案在資料夾裡，但不在 JSON 裡
const getUnregisteredFiles = (tag) => {
    const files = fs.readdirSync(PROT_DIR);
    return files.filter(file => {
        if (path.extname(file) !== '.md') return false;
        // 檢查 filename 是否存在於 tag.Data 中
        return !tag.Data.some(item => `${item.filename}.md` === file);
    });
};

// --- 路由 ---

//首頁渲染
app.get('/', (req, res) => {
    const tag = getPortTags();
    const unregistered = getUnregisteredFiles(tag);
    res.render('tag', { 
        tag: tag, 
        unregistered: unregistered // 傳給 EJS 顯示「未入庫」清單
    });
});

// 1. 添加數據（這裡可以改為接收前端傳來的標題等資訊）
app.post('/AddData', (req, res) => {
    const { filename, title, author, tagids } = req.body;
    let tag = getPortTags();

    // 構建新物件
    const newItem = {
        title: title,
        author: author,
        CreationDate: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }),
        Language: "正體中文",
        filename: filename,
        tagid: tagids ? tagids.split(',').map(s => s.trim()) : [] // 將 "1, 2" 轉為 ["1", "2"]
    };

    // 檢查是否重複（保險起見）
    if (tag.Data.some(item => item.filename === filename)) {
        return res.status(400).send("該檔案已存在於資料庫中");
    }

    tag.Data.push(newItem);

    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(tag, null, 2));
        console.log(`成功入庫: ${filename}`);
        res.redirect('/'); // 儲存後自動刷新頁面
    } catch (err) {
        res.status(500).send("儲存失敗: " + err.message);
    }
});


app.post('/UpdateData', (req, res) => {
    let tag = getPortTags();
    // 根據你 HTML Form 的 name 屬性對接欄位
    const { filename, title, author, tagids } = req.body;

    if (filename) {
        const itemIndex = tag.Data.findIndex(item => item.filename === filename);
        
        if (itemIndex !== -1) {
            // 更新數據
            if (title) tag.Data[itemIndex].title = title;
            if (author) tag.Data[itemIndex].author = author;
            if (tagids !== undefined) {
                // 將字串 "1, 2" 轉為 ["1", "2"]
                tag.Data[itemIndex].tagid = tagids.split(',').map(s => s.trim()).filter(s => s !== "");
            }
            console.log(`[更新成功] ${filename}`);
        } else {
            return res.status(404).send('找不到該檔案的記錄');
        }
    }

    // 同步清理：自動剔除檔案已不存在的記錄
    tag.Data = tag.Data.filter(item => {
        return fs.existsSync(path.join(PROT_DIR, `${item.filename}.md`));
    });

    // 儲存並跳轉
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(tag, null, 2));
        // 因為是 Form 提交，跳轉回首頁體驗更好
        res.redirect('/'); 
    } catch (err) {
        res.status(500).send('儲存失敗: ' + err.message);
    }
});

app.post('/CleanData', (req, res) => {
    let tag = getPortTags();
    const protDir = path.join(__dirname, '..', 'public', 'prot');
    
    const initialCount = tag.Data.length;
    
    // 找出哪些是要被刪掉的（供日誌記錄）
    const removedItems = tag.Data.filter(item => {
        const mdPath = path.join(protDir, `${item.filename}.md`);
        return !fs.existsSync(mdPath);
    });

    // 只保留「檔案存在」的項目
    tag.Data = tag.Data.filter(item => {
        const mdPath = path.join(protDir, `${item.filename}.md`);
        return fs.existsSync(mdPath);
    });

    const deletedCount = initialCount - tag.Data.length;

    if (deletedCount > 0) {
        try {
            const savePath = path.join(__dirname, 'data.json');
            fs.writeFileSync(savePath, JSON.stringify(tag, null, 2), 'utf-8');
            console.log(`成功清理 ${deletedCount} 條失效記錄`);
            res.json({ 
                success: true, 
                message: `已刪除 ${deletedCount} 條缺失檔案的記錄`,
                removed: removedItems.map(i => i.title)
            });
        } catch (err) {
            res.status(500).json({ success: false, message: '儲存失敗' });
        }
    } else {
        res.json({ success: true, message: '資料庫很健康，沒有需要清理的項目' });
    }
});

app.listen('3000', () => {
    console.log('管理介面已啟動: http://localhost:3000');
});