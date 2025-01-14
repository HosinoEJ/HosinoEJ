/*这是主页标题的动画部分。理论上其他界面也可以调用。


接口：
输入：id=IndexTitle
输出：id=outPut
*/


const typedtextElement = document.getElementById("IndexTitle");
const typedtextOutputElement = document.getElementById("outPut");
let charIndex = 0;
let text = typedtextElement.innerHTML;

typedtextElement.style.display = "none";

function typeText() {
    if (charIndex < text.length) {
        typedtextOutputElement.innerHTML = text.substring(0, charIndex + 1) + '<span class="cursor"></span>'; // 加入光標
        charIndex++;
        setTimeout(typeText, 50);
    } else {
        // 打字完成後移除光標
        if(typedtextOutputElement.querySelector('.cursor')){
            typedtextOutputElement.querySelector('.cursor').remove();
        }
    }
}

typeText();