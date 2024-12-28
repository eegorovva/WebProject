(function () {
    window.addEventListener('load', function () {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => createTask(task.text, task.completed));
    });

    document.getElementById('task-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const taskInput = event.target.title;
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTask(taskText, false);
            taskInput.value = "";
        }
    });

    function createTask(taskText, completed) {
        const taskContainer = document.getElementById('task-container');

        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <input type="checkbox" class="task__checkbox" ${completed ? "checked" : ""}>
            <p class="${completed ? "completed" : ""}">${taskText}</p>
            <button class="task__delete">Удалить</button>
        `;

        taskContainer.appendChild(taskElement);

        const checkbox = taskElement.querySelector('.task__checkbox');
        const taskTextElement = taskElement.querySelector('p');

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                taskTextElement.classList.add('completed');
            } else {
                taskTextElement.classList.remove('completed');
            }
            updateLocalStorage();
        });

        taskElement.querySelector('.task__delete').addEventListener('click', function () {
            taskContainer.removeChild(taskElement);
            updateLocalStorage();
        });

        updateLocalStorage();
    }

    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.task').forEach(taskElement => {
            const text = taskElement.querySelector('p').textContent;
            const completed = taskElement.querySelector('.task__checkbox').checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})();

