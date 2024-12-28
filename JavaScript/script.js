(function () {
    window.addEventListener('load', function () {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => createTask(taskText));
    });

    document.getElementById('task-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTask(taskText);
            taskInput.value = "";
        }
    });

    function createTask(taskText) {
        const taskContainer = document.getElementById('task-container');

        // Создаем элемент задачи
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <p>${taskText}</p>
            <button class="task__delete">Удалить</button>
        `;

        taskContainer.appendChild(taskElement);

        taskElement.querySelector('.task__delete').addEventListener('click', function () {
            taskContainer.removeChild(taskElement);
            updateLocalStorage();
        });

        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.task p').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})();
