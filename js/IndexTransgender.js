/*
这个js是给跨性别群体的彩蛋，在每年“国际跨性别现身日”中触发。
Index中的标题中的“GTEJR”五个字母会变成跨性别旗的五个颜色
*/

document.addEventListener("DOMContentLoaded", updateText);

function updateText() {
    const targetMonth = 3; // JavaScript 的月份从 0 开始，0 代表一月
    const targetDay = 1;
  
    const today = new Date();
  
    if (today.getMonth() === targetMonth && today.getDate() === targetDay) {
      const coloredGTEJR = `
        <t id="c-g">H</t>
        <t id="c-t">S</t>
        <t id="c-e">N</t>
        <t id="c-t">E</t>
        <t id="c-g">J</t>
      `;
      const originalText = document.getElementById("IndexTitle").textContent;
      let newText = originalText;
      const keywords = ["HosinoEJ", "星野栄治", "星野榮治" , "星野荣治"];
      for (const keyword of keywords) {
        if (originalText.includes(keyword)) {
          newText = originalText.replace(keyword, coloredGTEJR);
          break;
        }
      }
      document.getElementById("IndexTitle").innerHTML = newText;
    }
  }
  
  updateText();
  setInterval(updateText, 24 * 60 * 60 * 1000);