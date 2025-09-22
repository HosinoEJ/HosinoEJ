# HosinoEJ的MAIL發射器

一個很簡單的通過SMTP發送郵件的程式，不同的是它可以將發送對象的郵件發送到你設定的api中。

## 使用場景

作者是一個很喜歡用郵箱發資訊的人，但是其他人不一定。可以制作一個程式，首先將郵箱在數據庫中對應的qq號提取，再通過cq-http、NapCatQQ等程式將郵件提醒發給朋友。Telegram和Discord同理。

作者因爲精力問題暫時先不做之後的開發了，之後有時間會繼續研究的。

## 部署

### VPS

部署

```bash
npm install
```

生成環境變數

```bash
cp .env.example .env
```

在.env中修改配置，比如smtp伺服器等。

啓動

```bash
npm start
```

啓動後控制臺會顯示：

```
服务器运行在 http://localhost:{PORT}
运行模式: 监听模式
```

這就說明啓動成功了

### VERCEL

部署時部署指令爲

```bash
npm install
```

部署完成後需要在項目settings => Environment Variables 添加環境變數。具體格式參考.env.example