(function() {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        const navTime = window.performance.timing.domComplete - window.performance.timing.domLoading;

        const loadTimeElement = document.createElement('p');
        loadTimeElement.classList.add('footer__load-time-text');
        loadTimeElement.innerHTML =
            `<strong>Время загрузки страницы:</strong> ${Math.round(loadTime / 1000)} секунд`;

        document.querySelector('.footer__load-time').appendChild(loadTimeElement);
    });
})();

window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
        }, 1100);
    }
});

(function() {
    const currentPage = document.location.pathname.split('/').pop();

    const menuItems = document.querySelectorAll('.header__nav a');

    menuItems.forEach(item => {

        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
})();

