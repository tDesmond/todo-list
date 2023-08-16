import { ProjectHandler, Project, Task } from './projects';
// import { NewProjectEntry } from './uiController'
import { OpenNewTaskPopup } from './taskControllerUI';
import { NewProjectEntry } from './projectControllerUI';

const createProjectBtn = document.getElementById("new-project-btn");
const createTaskBtn= document.getElementById("new-task-btn");

createProjectBtn.addEventListener('click', () => {
    console.log("Create new project");
    NewProjectEntry()
})

createTaskBtn.addEventListener('click', () => {
    console.log("Create new task");
    if(ProjectHandler.projectsAvailible()){
        console.log(ProjectHandler.getAllProjects())
        OpenNewTaskPopup()
    }
})