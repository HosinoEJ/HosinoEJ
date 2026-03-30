/*
国际跨性别现身日 3月30日 标题彩色彩蛋
强制锁定渲染，不会被其他代码覆盖
*/
function applyTransColor() {
    const targetMonth = 2;
    const targetDay = 31;
    const today = new Date();

    // 非节日直接不执行
    if (today.getMonth() !== targetMonth || today.getDate() !== targetDay) return;

    const title = document.getElementById("IndexTitle");
    if (!title) return;

    // 彩色 HTML（跨性别旗配色）
    const coloredHtml = `
        <span class="c-g">H</span>
        <span class="c-g">o</span>
        <span class="c-t">s</span>
        <span class="c-t">i</span>
        <span class="c-e">n</span>
        <span class="c-e">o</span>
        <span class="c-t">N</span>
        <span class="c-t">e</span>
        <span class="c-g">k</span>
        <span class="c-g">o</span>
    `;

    // 强制替换，防止被覆盖
    if (title.innerHTML.includes("HosinoNeko")) {
        title.innerHTML = title.innerHTML.replace("HosinoNeko", coloredHtml);
    }
}

// 多种时机执行，确保稳定生效
document.addEventListener("DOMContentLoaded", applyTransColor);
window.addEventListener("load", applyTransColor);
setTimeout(applyTransColor, 300);  // 延迟强制覆盖
setTimeout(applyTransColor, 1000); // 最后兜底锁定

// 每日检查
setInterval(applyTransColor, 24 * 60 * 60 * 1000);