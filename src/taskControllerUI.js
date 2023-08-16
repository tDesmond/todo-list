import { ProjectHandler, Project, Task } from './projects';

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

        todoCheck.id = "task-" + task.id

        expandButton.textContent = "+"

        todoCheck.type = "checkbox"
        // TODO: Need to connect checkbox property to 
        todoCheck.checked = task.isComplete

        todoCheck.addEventListener('change', () => {
            task.isComplete = todoCheck.checked
            console.log(task)
        })

        console.log(task.name)
        todoTitle.textContent = task.name.toUpperCase()

        todoItem.appendChild(todoInfoMain)
        todoInfoMain.appendChild(todoCheck)
        todoInfoMain.appendChild(todoTitle)
        todoInfoMain.appendChild(expandButton)
        taskListContainer.appendChild(todoItem)  
        
    }
}

function ClearTasks() {
    const taskListContainer = document.getElementById("todo-list")

    // clear current todo list
    taskListContainer.innerHTML = ''
}

function OpenNewTaskPopup() {
    const newTaskForm = document.getElementById("form-container")
    const cancelBtn = document.getElementById("form-cancel-btn")
    newTaskForm.style.display = "block"
    
    newTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let regex = new RegExp("^[a-zA-Z0-9 ]+$");
        let text_input = document.getElementById("new-task-title").value

        if(regex.test(text_input)){
            // console.log("accepted", text_input)
            ProjectHandler.addProjectTask(ProjectHandler.getSelectedPorject().name, document.getElementById("new-task-title").value)

            // Clear the entry field for next use
            document.getElementById("new-task-title").value = null

            console.log("TASK ADDED: ", ProjectHandler.getAllProjects())

            // This stops the form from double submitting. 
            // TODO: Try understand this issue better.
            event.stopImmediatePropagation()
            newTaskForm.style.display = "none"

            LoadTasks()
        }else{
            alert("Invalid Characters used!!")
        }
    })

    cancelBtn.addEventListener('click', () => {
        newTaskForm.style.display = "none"
    })


}

export { OpenNewTaskPopup, LoadTasks, ClearTasks }
