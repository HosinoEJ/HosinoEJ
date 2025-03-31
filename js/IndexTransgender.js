/*
这个js是给跨性别群体的彩蛋，在每年“国际跨性别现身日”中触发。
Index中的标题中的“GTEJR”五个字母会变成跨性别旗的五个颜色
*/



function updateText() {
    const targetMonth = 2; // JavaScript 的月份从 0 开始，0 代表一月
    const targetDay = 31;
  
    const today = new Date();
  
    if (today.getMonth() === targetMonth && today.getDate() === targetDay) {
      const coloredGTEJR = `
        <span class="colored-g">H</span>
        <span class="colored-t">S</span>
        <span class="colored-e">N</span>
        <span class="colored-j">E</span>
        <span class="colored-r">J</span>
      `;
      const originalText = document.getElementById("IndexTitle").textContent;
      const newText = originalText.replace("HSNEJ", coloredGTEJR);
      document.getElementById("IndexTitle").innerHTML = newText;
    }
  }
  
  updateText();
  setInterval(updateText, 24 * 60 * 60 * 1000);