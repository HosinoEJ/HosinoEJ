/*这是主页标题的动画部分。理论上其他界面也可以调用。


接口：
输入：id=IndexTitle
输出：id=outPut
*/


document.addEventListener("DOMContentLoaded", function() {
    const typedtextElement = document.getElementById("IndexTitle");
    const typedtextOutputElement = document.getElementById("outPut");
    
    if (!typedtextElement || !typedtextOutputElement) {
        console.error("元素未找到！");
        return;
    }

    let charIndex = 0;
    let text = typedtextElement.innerHTML;
    typedtextElement.style.display = "none";

    function typeText() {
        if (charIndex < text.length) {
            typedtextOutputElement.innerHTML = text.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            const cursor = typedtextOutputElement.querySelector('.cursor');
            if (cursor) cursor.remove();
        }
    }

    typeText();
});