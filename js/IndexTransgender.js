/*
这个js是给跨性别群体的彩蛋，在每年“国际跨性别现身日”中触发。
Index中的标题中的“GTEJR”五个字母会变成跨性别旗的五个颜色
*/



function updateText() {
    const targetMonth = 10; // JavaScript 的月份从 0 开始，0 代表一月
    const targetDay = 20;
  
    const today = new Date();
  
    if (today.getMonth() === targetMonth && today.getDate() === targetDay) {
      const coloredGTEJR = `
        <span class="colored-g">G</span>
        <span class="colored-t">T</span>
        <span class="colored-e">E</span>
        <span class="colored-j">J</span>
        <span class="colored-r">R</span>
      `;
      const originalText = document.getElementById("IndexTitle").textContent;
      const newText = originalText.replace("GTEJR", coloredGTEJR);
      document.getElementById("IndexTitle").innerHTML = newText;
    }
  }
  
  updateText();
  setInterval(updateText, 24 * 60 * 60 * 1000);