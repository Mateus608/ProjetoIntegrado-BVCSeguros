let lastScrollTop = 0;
const header = document.querySelector('.nav-menu-superior');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Rolar para baixo: esconde o menu
        header.style.top = "-100px"; // ou qualquer valor suficiente para esconder
    } else {
        // Rolar para cima: mostra o menu
        header.style.top = "0";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // evita valores negativos
});
