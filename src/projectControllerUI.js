import { ProjectHandler, Project, Task } from './projects';
import { ClearTasks, LoadTasks } from './taskControllerUI';


function ChangeSelectedPoject(project_name){

    // if there is a selected project set it to false
    (ProjectHandler.getSelectedPorject()) ? ProjectHandler.getSelectedPorject().selected = false : null
    ProjectHandler.getProject(project_name).selected = true 
    document.getElementById("todo-project-heading").textContent = project_name.toUpperCase()

    LoadTasks()
}

function UpdateSidebarProjectList() {
    const projectSelectionList = document.getElementById("project-selection")

    // Itterate through project names and add them to the sidebar
    // Clear the items already added to the sidebar or check id to see if they are added
    for(const project_name in ProjectHandler.getAllProjects()){
        // only append item if it does not already exist
        // Set all created projects to not selected for display. When a new project is created
        // ProjectHandler.getProject(project_name).selected = false

        if(projectSelectionList.querySelector("#" + ProjectHandler.getProject(project_name).id) == null){
            console.log("ADDING:", project_name)
            const projectItem = document.createElement('div')
            const projectName = document.createElement('p')
            const projectDeleteBtn = document.createElement('button')

            projectItem.className = "project-item"
            projectName.className = "project-name"
            projectDeleteBtn.className = "project-expand-btn"

            projectDeleteBtn.textContent = '-'
            projectName.textContent = project_name.toUpperCase()
            projectName.id = ProjectHandler.getProject(project_name).id

            ChangeSelectedPoject(project_name)

            projectName.addEventListener('click', () => ChangeSelectedPoject(project_name))

            projectDeleteBtn.addEventListener('click', (event) => {
                event.preventDefault()

                // Delete Project from project list
                event.target.parentNode.remove()

                // Remove project from projects object
                ProjectHandler.removeProject(project_name)

                // TODO: Check the need for this. Was stopping multiple events happening on click.
                event.stopImmediatePropagation()

                // Remove div before data
                if(ProjectHandler.projectsAvailible()){
                    ChangeSelectedPoject(ProjectHandler.getFirstProject().name) 
                }else{
                    document.getElementById("todo-project-heading").textContent = ""
                }

                ClearTasks()
            })

            projectItem.appendChild(projectName)
            projectItem.appendChild(projectDeleteBtn)
            projectSelectionList.appendChild(projectItem)
        }else{

        }
    } 
}

function NewProjectEntry() {
    // Make a text box appear that the user can enter the new project with.
    // Make two buttons +/- to add the project or cancel the entry
    const projectSelectionList = document.getElementById("project-selection")
    const projectInputDiv = document.createElement('div')
    const projectTextField = document.createElement('input')
    const addBtn = document.createElement('button')
    const cancelBtn = document.createElement('button')

    cancelBtn.addEventListener('click', (e) => {
        // This will cancel the entry of a new project and kill the NewProjectEntry div
        e.target.parentNode.remove()
    })

    addBtn.addEventListener('click', (event) => {
        event.preventDefault()
        
        let regex = new RegExp("^[a-zA-Z0-9 ]+$");
        let text_input = projectTextField.value

        if(regex.test(text_input)){
            console.log("accepted", text_input)
            ProjectHandler.createProject(text_input)
            UpdateSidebarProjectList()

            event.stopImmediatePropagation()

            // Clear entry field
            event.target.parentNode.remove()
            
        }else{
            alert("Invalid Characters used!!")
        }
            
        
    })

    // Add Button Text
    addBtn.textContent = '+'
    cancelBtn.textContent = '-'

    // Set input to text
    projectTextField.type = 'text'
    projectTextField.maxLength = 20

    // Add id so I can change style in css
    projectInputDiv.id = 'project-input'
    projectTextField.id = 'project-input-text'
    addBtn.id = 'create-project-btn'
    cancelBtn.id = 'cancel-project-btn'
    
    // Add the new elements
    projectInputDiv.appendChild(projectTextField)
    projectInputDiv.appendChild(addBtn)
    projectInputDiv.appendChild(cancelBtn)
    projectSelectionList.appendChild(projectInputDiv)
}

export { NewProjectEntry }