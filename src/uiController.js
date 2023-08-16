import { ProjectHandler, Project, Task } from './projects';

const newTaskForm = document.getElementById("form-container")

function LoadTasks() {
    const taskListContainer = document.getElementById("todo-list")

    // clear current todo list
    taskListContainer.innerHTML = ''

    const project = ProjectHandler.getSelectedPorject()

    for(const task of project.tasks){
        const todoItem = document.createElement("div")
        const todoInfoMain = document.createElement("label")
        const todoCheck = document.createElement("input")
        const expandButton = document.createElement("button")
        const todoTitle = document.createElement("div")

        todoItem.className = "todo-item"
        todoInfoMain.className = "todo-info-main"
        todoTitle.className = "todo-title"
        expandButton.className = "todo-expand-bttn"

        expandButton.textContent = "+"

        todoCheck.type = "checkbox"

        console.log(task.name)
        todoTitle.textContent = task.name.toUpperCase()

        todoItem.appendChild(todoInfoMain)
        todoInfoMain.appendChild(todoCheck)
        todoInfoMain.appendChild(todoTitle)
        todoInfoMain.appendChild(expandButton)
        taskListContainer.appendChild(todoItem)  
        
    }
}

function OpenNewTaskPopup() {
    newTaskForm.style.display = "block"
    
    newTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ProjectHandler.addProjectTask(ProjectHandler.getSelectedPorject().name, document.getElementById("new-task-title").value)
        document.getElementById("new-task-title").value = null

        console.log("TASK ADDED: ", ProjectHandler.getAllProjects())

        // This stops the form from double submitting. 
        // TODO: Try understand this issue better.
        event.stopImmediatePropagation()
        newTaskForm.style.display = "none"

        LoadTasks()

        // TODO: Add task to div
        // TODO: Clear popup
    })
}
