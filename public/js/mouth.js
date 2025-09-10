const divA = document.getElementById('mouth');
const divB = document.getElementById('context');

document.addEventListener('mousemove', e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // divA 中心對齊鼠標
    divA.style.left = (mouseX - divA.offsetWidth/2) + 'px';
    divA.style.top = (mouseY - divA.offsetHeight/2) + 'px';

    // divB 左下角對齊鼠標
    divB.style.left = mouseX + 'px';
    divB.style.top = (mouseY - divB.offsetHeight) + 'px';
});

document.addEventListener('click',(e) => {
    const mouth = document.getElementById('mouth');
    mouth.classList.add('mouth-show');
    setTimeout(() => {
        mouth.classList.remove('mouth-show');
    },2000)
});