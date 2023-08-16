function Project(name) {
    this.name = name
    this.id = name.replace(" ", "-").toLowerCase()
    this.selected = true // set to false on creation
    this.tasks = []
}

function Task(name){
    this.name = name
    this.id = name.replace(" ", "-").toLowerCase()
    this.isComplete = false
}

Project.prototype.addTask = function (new_task_name) {
    this.tasks.push(new Task(new_task_name));
}

const ProjectHandler = (() => {
    const projects = {}
    const projectsAvailible = () => (Object.keys(projects).length > 0) ? true : false;
    const getAllProjects = () => projects
    const getProject = (name) => projects[name]
    const getFirstProject = () => Object.values(projects)[0]
    const getProjectTask = (name) => projects[name].tasks;
    const addProjectTask = (project_name, task_name) => {
        console.log(project_name, task_name)
        projects[project_name].addTask(task_name)
    }
    const removeProject = (name) => delete projects[name];

    const createProject = (name) => {
        deselectAllProjects()
        projects[name] = new Project(name);
    }

    // When a new project is created, it's initial state will be set to select. Deseslect other projects to make sure no more than two are selected at a time.
    // TODO: Should not need this function. Figure out a better way of keeping one item selected at a time.
    const deselectAllProjects = () =>  {
        for(const project_name in projects){
            projects[project_name].selected = false
        }
    }

    const getSelectedPorject = () => {
        for(const project_name in projects){
            // console.log(project_name, projects[project_name], projects[project_name].selected)
            if(projects[project_name].selected){
                return projects[project_name]
            }
        }
    }

    return { createProject, removeProject, getAllProjects, getProject, getProjectTask, addProjectTask, projectsAvailible, getSelectedPorject, getFirstProject }
})();

export { ProjectHandler, Project, Task }