(function() {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;

        const loadTimeElement = document.createElement('p');
        loadTimeElement.classList.add('footer__load-time-text');
        loadTimeElement.innerHTML =
            `<strong>Время загрузки страницы:</strong> 0, ${Math.round(loadTime / 100)} секунд`;

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

document.addEventListener("DOMContentLoaded", () => {
    const films = [
        { id: 1, preloaderId: "preloader-1", listId: "comments-list-1", errorId: "error-message-1" },
        { id: 2, preloaderId: "preloader-2", listId: "comments-list-2", errorId: "error-message-2" },
        { id: 3, preloaderId: "preloader-3", listId: "comments-list-3", errorId: "error-message-3" },
        { id: 4, preloaderId: "preloader-4", listId: "comments-list-4", errorId: "error-message-4" },
        { id: 5, preloaderId: "preloader-5", listId: "comments-list-5", errorId: "error-message-5" },
    ];

    const getRandomFilter = () => {
        return Math.random() > 0.5 ? 'id>100' : 'id<200';
    };

    films.forEach(film => {
        const preloader = document.getElementById(film.preloaderId);
        const commentsList = document.getElementById(film.listId);
        const errorMessage = document.getElementById(film.errorId);

        preloader.style.display = "flex";

        const filter = getRandomFilter();

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${film.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let filteredData = [];
                if (filter === 'id>100') {
                    filteredData = data.filter(comment => comment.id > 100);
                } else {
                    filteredData = data.filter(comment => comment.id < 200);
                }

                preloader.style.display = "none";

                filteredData.forEach(comment => {
                    const commentItem = document.createElement("li");
                    commentItem.classList.add("comment-item");
                    commentItem.innerHTML = `
                        <strong>${comment.name}</strong> (${comment.email}):
                        <p>${comment.body}</p>
                    `;
                    commentsList.appendChild(commentItem);
                });
            })
            .catch(error => {
                preloader.style.display = "none";
                errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте снова.";
                console.error("Ошибка загрузки:", error);
            });
    });
});





