/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projectControllerUI.js":
/*!************************************!*\
  !*** ./src/projectControllerUI.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewProjectEntry: () => (/* binding */ NewProjectEntry)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _taskControllerUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskControllerUI */ "./src/taskControllerUI.js");




function ChangeSelectedPoject(project_name){

    // if there is a selected project set it to false
    (_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getSelectedPorject()) ? _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getSelectedPorject().selected = false : null
    _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getProject(project_name).selected = true 
    document.getElementById("todo-project-heading").textContent = project_name.toUpperCase()

    ;(0,_taskControllerUI__WEBPACK_IMPORTED_MODULE_1__.LoadTasks)()
}

function UpdateSidebarProjectList() {
    const projectSelectionList = document.getElementById("project-selection")

    // Itterate through project names and add them to the sidebar
    // Clear the items already added to the sidebar or check id to see if they are added
    for(const project_name in _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getAllProjects()){
        // only append item if it does not already exist
        // Set all created projects to not selected for display. When a new project is created
        // ProjectHandler.getProject(project_name).selected = false

        if(projectSelectionList.querySelector("#" + _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getProject(project_name).id) == null){
            console.log("ADDING:", project_name)
            const projectItem = document.createElement('div')
            const projectName = document.createElement('p')
            const projectDeleteBtn = document.createElement('button')

            projectItem.className = "project-item"
            projectName.className = "project-name"
            projectDeleteBtn.className = "project-expand-btn"

            projectDeleteBtn.textContent = '-'
            projectName.textContent = project_name.toUpperCase()
            projectName.id = _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getProject(project_name).id

            ChangeSelectedPoject(project_name)

            projectName.addEventListener('click', () => ChangeSelectedPoject(project_name))

            projectDeleteBtn.addEventListener('click', (event) => {
                event.preventDefault()

                // Delete Project from project list
                event.target.parentNode.remove()

                // Remove project from projects object
                _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.removeProject(project_name)

                // TODO: Check the need for this. Was stopping multiple events happening on click.
                event.stopImmediatePropagation()

                // Remove div before data
                if(_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.projectsAvailible()){
                    ChangeSelectedPoject(_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getFirstProject().name) 
                }else{
                    document.getElementById("todo-project-heading").textContent = ""
                }

                (0,_taskControllerUI__WEBPACK_IMPORTED_MODULE_1__.ClearTasks)()
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
            _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.createProject(text_input)
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



/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectHandler: () => (/* binding */ ProjectHandler),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
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



/***/ }),

/***/ "./src/taskControllerUI.js":
/*!*********************************!*\
  !*** ./src/taskControllerUI.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClearTasks: () => (/* binding */ ClearTasks),
/* harmony export */   LoadTasks: () => (/* binding */ LoadTasks),
/* harmony export */   OpenNewTaskPopup: () => (/* binding */ OpenNewTaskPopup)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");


function LoadTasks() {
    const taskListContainer = document.getElementById("todo-list")

    // clear current todo list
    taskListContainer.innerHTML = ''

    const project = _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getSelectedPorject()

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
            _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.addProjectTask(_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getSelectedPorject().name, document.getElementById("new-task-title").value)

            // Clear the entry field for next use
            document.getElementById("new-task-title").value = null

            console.log("TASK ADDED: ", _projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getAllProjects())

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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _taskControllerUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskControllerUI */ "./src/taskControllerUI.js");
/* harmony import */ var _projectControllerUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectControllerUI */ "./src/projectControllerUI.js");

// import { NewProjectEntry } from './uiController'



const createProjectBtn = document.getElementById("new-project-btn");
const createTaskBtn= document.getElementById("new-task-btn");

createProjectBtn.addEventListener('click', () => {
    console.log("Create new project");
    (0,_projectControllerUI__WEBPACK_IMPORTED_MODULE_2__.NewProjectEntry)()
})

createTaskBtn.addEventListener('click', () => {
    console.log("Create new task");
    if(_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.projectsAvailible()){
        console.log(_projects__WEBPACK_IMPORTED_MODULE_0__.ProjectHandler.getAllProjects())
        ;(0,_taskControllerUI__WEBPACK_IMPORTED_MODULE_1__.OpenNewTaskPopup)()
    }
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0JBQWtCO0FBQ3dCO0FBQ0U7O0FBRXhEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUkscUVBQWU7QUFDbkIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsT0FBTyxxREFBYztBQUNyQixvQkFBb0IscURBQWM7QUFDbEMsUUFBUSxvRUFBZ0I7QUFDeEI7QUFDQSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdENvbnRyb2xsZXJVSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tDb250cm9sbGVyVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3RIYW5kbGVyLCBQcm9qZWN0LCBUYXNrIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgeyBDbGVhclRhc2tzLCBMb2FkVGFza3MgfSBmcm9tICcuL3Rhc2tDb250cm9sbGVyVUknO1xuXG5cbmZ1bmN0aW9uIENoYW5nZVNlbGVjdGVkUG9qZWN0KHByb2plY3RfbmFtZSl7XG5cbiAgICAvLyBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIHByb2plY3Qgc2V0IGl0IHRvIGZhbHNlXG4gICAgKFByb2plY3RIYW5kbGVyLmdldFNlbGVjdGVkUG9yamVjdCgpKSA/IFByb2plY3RIYW5kbGVyLmdldFNlbGVjdGVkUG9yamVjdCgpLnNlbGVjdGVkID0gZmFsc2UgOiBudWxsXG4gICAgUHJvamVjdEhhbmRsZXIuZ2V0UHJvamVjdChwcm9qZWN0X25hbWUpLnNlbGVjdGVkID0gdHJ1ZSBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG8tcHJvamVjdC1oZWFkaW5nXCIpLnRleHRDb250ZW50ID0gcHJvamVjdF9uYW1lLnRvVXBwZXJDYXNlKClcblxuICAgIExvYWRUYXNrcygpXG59XG5cbmZ1bmN0aW9uIFVwZGF0ZVNpZGViYXJQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0U2VsZWN0aW9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3Rpb25cIilcblxuICAgIC8vIEl0dGVyYXRlIHRocm91Z2ggcHJvamVjdCBuYW1lcyBhbmQgYWRkIHRoZW0gdG8gdGhlIHNpZGViYXJcbiAgICAvLyBDbGVhciB0aGUgaXRlbXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgc2lkZWJhciBvciBjaGVjayBpZCB0byBzZWUgaWYgdGhleSBhcmUgYWRkZWRcbiAgICBmb3IoY29uc3QgcHJvamVjdF9uYW1lIGluIFByb2plY3RIYW5kbGVyLmdldEFsbFByb2plY3RzKCkpe1xuICAgICAgICAvLyBvbmx5IGFwcGVuZCBpdGVtIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3RcbiAgICAgICAgLy8gU2V0IGFsbCBjcmVhdGVkIHByb2plY3RzIHRvIG5vdCBzZWxlY3RlZCBmb3IgZGlzcGxheS4gV2hlbiBhIG5ldyBwcm9qZWN0IGlzIGNyZWF0ZWRcbiAgICAgICAgLy8gUHJvamVjdEhhbmRsZXIuZ2V0UHJvamVjdChwcm9qZWN0X25hbWUpLnNlbGVjdGVkID0gZmFsc2VcblxuICAgICAgICBpZihwcm9qZWN0U2VsZWN0aW9uTGlzdC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgUHJvamVjdEhhbmRsZXIuZ2V0UHJvamVjdChwcm9qZWN0X25hbWUpLmlkKSA9PSBudWxsKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQURESU5HOlwiLCBwcm9qZWN0X25hbWUpXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgICAgICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5cbiAgICAgICAgICAgIHByb2plY3RJdGVtLmNsYXNzTmFtZSA9IFwicHJvamVjdC1pdGVtXCJcbiAgICAgICAgICAgIHByb2plY3ROYW1lLmNsYXNzTmFtZSA9IFwicHJvamVjdC1uYW1lXCJcbiAgICAgICAgICAgIHByb2plY3REZWxldGVCdG4uY2xhc3NOYW1lID0gXCJwcm9qZWN0LWV4cGFuZC1idG5cIlxuXG4gICAgICAgICAgICBwcm9qZWN0RGVsZXRlQnRuLnRleHRDb250ZW50ID0gJy0nXG4gICAgICAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3RfbmFtZS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICBwcm9qZWN0TmFtZS5pZCA9IFByb2plY3RIYW5kbGVyLmdldFByb2plY3QocHJvamVjdF9uYW1lKS5pZFxuXG4gICAgICAgICAgICBDaGFuZ2VTZWxlY3RlZFBvamVjdChwcm9qZWN0X25hbWUpXG5cbiAgICAgICAgICAgIHByb2plY3ROYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gQ2hhbmdlU2VsZWN0ZWRQb2plY3QocHJvamVjdF9uYW1lKSlcblxuICAgICAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSBQcm9qZWN0IGZyb20gcHJvamVjdCBsaXN0XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKClcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9qZWN0IGZyb20gcHJvamVjdHMgb2JqZWN0XG4gICAgICAgICAgICAgICAgUHJvamVjdEhhbmRsZXIucmVtb3ZlUHJvamVjdChwcm9qZWN0X25hbWUpXG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayB0aGUgbmVlZCBmb3IgdGhpcy4gV2FzIHN0b3BwaW5nIG11bHRpcGxlIGV2ZW50cyBoYXBwZW5pbmcgb24gY2xpY2suXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBkaXYgYmVmb3JlIGRhdGFcbiAgICAgICAgICAgICAgICBpZihQcm9qZWN0SGFuZGxlci5wcm9qZWN0c0F2YWlsaWJsZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgQ2hhbmdlU2VsZWN0ZWRQb2plY3QoUHJvamVjdEhhbmRsZXIuZ2V0Rmlyc3RQcm9qZWN0KCkubmFtZSkgXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1wcm9qZWN0LWhlYWRpbmdcIikudGV4dENvbnRlbnQgPSBcIlwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgQ2xlYXJUYXNrcygpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSlcbiAgICAgICAgICAgIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3REZWxldGVCdG4pXG4gICAgICAgICAgICBwcm9qZWN0U2VsZWN0aW9uTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSlcbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgfVxuICAgIH0gXG59XG5cbmZ1bmN0aW9uIE5ld1Byb2plY3RFbnRyeSgpIHtcbiAgICAvLyBNYWtlIGEgdGV4dCBib3ggYXBwZWFyIHRoYXQgdGhlIHVzZXIgY2FuIGVudGVyIHRoZSBuZXcgcHJvamVjdCB3aXRoLlxuICAgIC8vIE1ha2UgdHdvIGJ1dHRvbnMgKy8tIHRvIGFkZCB0aGUgcHJvamVjdCBvciBjYW5jZWwgdGhlIGVudHJ5XG4gICAgY29uc3QgcHJvamVjdFNlbGVjdGlvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc2VsZWN0aW9uXCIpXG4gICAgY29uc3QgcHJvamVjdElucHV0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb25zdCBwcm9qZWN0VGV4dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcblxuICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCBjYW5jZWwgdGhlIGVudHJ5IG9mIGEgbmV3IHByb2plY3QgYW5kIGtpbGwgdGhlIE5ld1Byb2plY3RFbnRyeSBkaXZcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKVxuICAgIH0pXG5cbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBcbiAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05IF0rJFwiKTtcbiAgICAgICAgbGV0IHRleHRfaW5wdXQgPSBwcm9qZWN0VGV4dEZpZWxkLnZhbHVlXG5cbiAgICAgICAgaWYocmVnZXgudGVzdCh0ZXh0X2lucHV0KSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFjY2VwdGVkXCIsIHRleHRfaW5wdXQpXG4gICAgICAgICAgICBQcm9qZWN0SGFuZGxlci5jcmVhdGVQcm9qZWN0KHRleHRfaW5wdXQpXG4gICAgICAgICAgICBVcGRhdGVTaWRlYmFyUHJvamVjdExpc3QoKVxuXG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgICAvLyBDbGVhciBlbnRyeSBmaWVsZFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKClcbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBDaGFyYWN0ZXJzIHVzZWQhIVwiKVxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgXG4gICAgfSlcblxuICAgIC8vIEFkZCBCdXR0b24gVGV4dFxuICAgIGFkZEJ0bi50ZXh0Q29udGVudCA9ICcrJ1xuICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICctJ1xuXG4gICAgLy8gU2V0IGlucHV0IHRvIHRleHRcbiAgICBwcm9qZWN0VGV4dEZpZWxkLnR5cGUgPSAndGV4dCdcbiAgICBwcm9qZWN0VGV4dEZpZWxkLm1heExlbmd0aCA9IDIwXG5cbiAgICAvLyBBZGQgaWQgc28gSSBjYW4gY2hhbmdlIHN0eWxlIGluIGNzc1xuICAgIHByb2plY3RJbnB1dERpdi5pZCA9ICdwcm9qZWN0LWlucHV0J1xuICAgIHByb2plY3RUZXh0RmllbGQuaWQgPSAncHJvamVjdC1pbnB1dC10ZXh0J1xuICAgIGFkZEJ0bi5pZCA9ICdjcmVhdGUtcHJvamVjdC1idG4nXG4gICAgY2FuY2VsQnRuLmlkID0gJ2NhbmNlbC1wcm9qZWN0LWJ0bidcbiAgICBcbiAgICAvLyBBZGQgdGhlIG5ldyBlbGVtZW50c1xuICAgIHByb2plY3RJbnB1dERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGV4dEZpZWxkKVxuICAgIHByb2plY3RJbnB1dERpdi5hcHBlbmRDaGlsZChhZGRCdG4pXG4gICAgcHJvamVjdElucHV0RGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bilcbiAgICBwcm9qZWN0U2VsZWN0aW9uTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SW5wdXREaXYpXG59XG5cbmV4cG9ydCB7IE5ld1Byb2plY3RFbnRyeSB9IiwiZnVuY3Rpb24gUHJvamVjdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMuaWQgPSBuYW1lLnJlcGxhY2UoXCIgXCIsIFwiLVwiKS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWUgLy8gc2V0IHRvIGZhbHNlIG9uIGNyZWF0aW9uXG4gICAgdGhpcy50YXNrcyA9IFtdXG59XG5cbmZ1bmN0aW9uIFRhc2sobmFtZSl7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMuaWQgPSBuYW1lLnJlcGxhY2UoXCIgXCIsIFwiLVwiKS50b0xvd2VyQ2FzZSgpXG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2Vcbn1cblxuUHJvamVjdC5wcm90b3R5cGUuYWRkVGFzayA9IGZ1bmN0aW9uIChuZXdfdGFza19uYW1lKSB7XG4gICAgdGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKG5ld190YXNrX25hbWUpKTtcbn1cblxuY29uc3QgUHJvamVjdEhhbmRsZXIgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RzID0ge31cbiAgICBjb25zdCBwcm9qZWN0c0F2YWlsaWJsZSA9ICgpID0+IChPYmplY3Qua2V5cyhwcm9qZWN0cykubGVuZ3RoID4gMCkgPyB0cnVlIDogZmFsc2U7XG4gICAgY29uc3QgZ2V0QWxsUHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0c1xuICAgIGNvbnN0IGdldFByb2plY3QgPSAobmFtZSkgPT4gcHJvamVjdHNbbmFtZV1cbiAgICBjb25zdCBnZXRGaXJzdFByb2plY3QgPSAoKSA9PiBPYmplY3QudmFsdWVzKHByb2plY3RzKVswXVxuICAgIGNvbnN0IGdldFByb2plY3RUYXNrID0gKG5hbWUpID0+IHByb2plY3RzW25hbWVdLnRhc2tzO1xuICAgIGNvbnN0IGFkZFByb2plY3RUYXNrID0gKHByb2plY3RfbmFtZSwgdGFza19uYW1lKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RfbmFtZSwgdGFza19uYW1lKVxuICAgICAgICBwcm9qZWN0c1twcm9qZWN0X25hbWVdLmFkZFRhc2sodGFza19uYW1lKVxuICAgIH1cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKG5hbWUpID0+IGRlbGV0ZSBwcm9qZWN0c1tuYW1lXTtcblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAobmFtZSkgPT4ge1xuICAgICAgICBkZXNlbGVjdEFsbFByb2plY3RzKClcbiAgICAgICAgcHJvamVjdHNbbmFtZV0gPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIGEgbmV3IHByb2plY3QgaXMgY3JlYXRlZCwgaXQncyBpbml0aWFsIHN0YXRlIHdpbGwgYmUgc2V0IHRvIHNlbGVjdC4gRGVzZXNsZWN0IG90aGVyIHByb2plY3RzIHRvIG1ha2Ugc3VyZSBubyBtb3JlIHRoYW4gdHdvIGFyZSBzZWxlY3RlZCBhdCBhIHRpbWUuXG4gICAgLy8gVE9ETzogU2hvdWxkIG5vdCBuZWVkIHRoaXMgZnVuY3Rpb24uIEZpZ3VyZSBvdXQgYSBiZXR0ZXIgd2F5IG9mIGtlZXBpbmcgb25lIGl0ZW0gc2VsZWN0ZWQgYXQgYSB0aW1lLlxuICAgIGNvbnN0IGRlc2VsZWN0QWxsUHJvamVjdHMgPSAoKSA9PiAge1xuICAgICAgICBmb3IoY29uc3QgcHJvamVjdF9uYW1lIGluIHByb2plY3RzKXtcbiAgICAgICAgICAgIHByb2plY3RzW3Byb2plY3RfbmFtZV0uc2VsZWN0ZWQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0U2VsZWN0ZWRQb3JqZWN0ID0gKCkgPT4ge1xuICAgICAgICBmb3IoY29uc3QgcHJvamVjdF9uYW1lIGluIHByb2plY3RzKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RfbmFtZSwgcHJvamVjdHNbcHJvamVjdF9uYW1lXSwgcHJvamVjdHNbcHJvamVjdF9uYW1lXS5zZWxlY3RlZClcbiAgICAgICAgICAgIGlmKHByb2plY3RzW3Byb2plY3RfbmFtZV0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0c1twcm9qZWN0X25hbWVdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBjcmVhdGVQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCBnZXRBbGxQcm9qZWN0cywgZ2V0UHJvamVjdCwgZ2V0UHJvamVjdFRhc2ssIGFkZFByb2plY3RUYXNrLCBwcm9qZWN0c0F2YWlsaWJsZSwgZ2V0U2VsZWN0ZWRQb3JqZWN0LCBnZXRGaXJzdFByb2plY3QgfVxufSkoKTtcblxuZXhwb3J0IHsgUHJvamVjdEhhbmRsZXIsIFByb2plY3QsIFRhc2sgfSIsImltcG9ydCB7IFByb2plY3RIYW5kbGVyLCBQcm9qZWN0LCBUYXNrIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmZ1bmN0aW9uIExvYWRUYXNrcygpIHtcbiAgICBjb25zdCB0YXNrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1saXN0XCIpXG5cbiAgICAvLyBjbGVhciBjdXJyZW50IHRvZG8gbGlzdFxuICAgIHRhc2tMaXN0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnXG5cbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdEhhbmRsZXIuZ2V0U2VsZWN0ZWRQb3JqZWN0KClcblxuICAgIGZvcihjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3Mpe1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY29uc3QgdG9kb0luZm9NYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpXG4gICAgICAgIGNvbnN0IHRvZG9DaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgICAgICBjb25zdCBleHBhbmRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblxuICAgICAgICB0b2RvSXRlbS5jbGFzc05hbWUgPSBcInRvZG8taXRlbVwiXG4gICAgICAgIHRvZG9JbmZvTWFpbi5jbGFzc05hbWUgPSBcInRvZG8taW5mby1tYWluXCJcbiAgICAgICAgdG9kb1RpdGxlLmNsYXNzTmFtZSA9IFwidG9kby10aXRsZVwiXG4gICAgICAgIGV4cGFuZEJ1dHRvbi5jbGFzc05hbWUgPSBcInRvZG8tZXhwYW5kLWJ0dG5cIlxuXG4gICAgICAgIHRvZG9DaGVjay5pZCA9IFwidGFzay1cIiArIHRhc2suaWRcblxuICAgICAgICBleHBhbmRCdXR0b24udGV4dENvbnRlbnQgPSBcIitcIlxuXG4gICAgICAgIHRvZG9DaGVjay50eXBlID0gXCJjaGVja2JveFwiXG4gICAgICAgIC8vIFRPRE86IE5lZWQgdG8gY29ubmVjdCBjaGVja2JveCBwcm9wZXJ0eSB0byBcbiAgICAgICAgdG9kb0NoZWNrLmNoZWNrZWQgPSB0YXNrLmlzQ29tcGxldGVcblxuICAgICAgICB0b2RvQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlID0gdG9kb0NoZWNrLmNoZWNrZWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2spXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc29sZS5sb2codGFzay5uYW1lKVxuICAgICAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLm5hbWUudG9VcHBlckNhc2UoKVxuXG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRvZG9JbmZvTWFpbilcbiAgICAgICAgdG9kb0luZm9NYWluLmFwcGVuZENoaWxkKHRvZG9DaGVjaylcbiAgICAgICAgdG9kb0luZm9NYWluLmFwcGVuZENoaWxkKHRvZG9UaXRsZSlcbiAgICAgICAgdG9kb0luZm9NYWluLmFwcGVuZENoaWxkKGV4cGFuZEJ1dHRvbilcbiAgICAgICAgdGFza0xpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pICBcbiAgICAgICAgXG4gICAgfVxufVxuXG5mdW5jdGlvbiBDbGVhclRhc2tzKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2RvLWxpc3RcIilcblxuICAgIC8vIGNsZWFyIGN1cnJlbnQgdG9kbyBsaXN0XG4gICAgdGFza0xpc3RDb250YWluZXIuaW5uZXJIVE1MID0gJydcbn1cblxuZnVuY3Rpb24gT3Blbk5ld1Rhc2tQb3B1cCgpIHtcbiAgICBjb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS1jb250YWluZXJcIilcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm0tY2FuY2VsLWJ0blwiKVxuICAgIG5ld1Rhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICBcbiAgICBuZXdUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkgXSskXCIpO1xuICAgICAgICBsZXQgdGV4dF9pbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2stdGl0bGVcIikudmFsdWVcblxuICAgICAgICBpZihyZWdleC50ZXN0KHRleHRfaW5wdXQpKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWNjZXB0ZWRcIiwgdGV4dF9pbnB1dClcbiAgICAgICAgICAgIFByb2plY3RIYW5kbGVyLmFkZFByb2plY3RUYXNrKFByb2plY3RIYW5kbGVyLmdldFNlbGVjdGVkUG9yamVjdCgpLm5hbWUsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2stdGl0bGVcIikudmFsdWUpXG5cbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSBlbnRyeSBmaWVsZCBmb3IgbmV4dCB1c2VcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2stdGl0bGVcIikudmFsdWUgPSBudWxsXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVEFTSyBBRERFRDogXCIsIFByb2plY3RIYW5kbGVyLmdldEFsbFByb2plY3RzKCkpXG5cbiAgICAgICAgICAgIC8vIFRoaXMgc3RvcHMgdGhlIGZvcm0gZnJvbSBkb3VibGUgc3VibWl0dGluZy4gXG4gICAgICAgICAgICAvLyBUT0RPOiBUcnkgdW5kZXJzdGFuZCB0aGlzIGlzc3VlIGJldHRlci5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBuZXdUYXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcblxuICAgICAgICAgICAgTG9hZFRhc2tzKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBhbGVydChcIkludmFsaWQgQ2hhcmFjdGVycyB1c2VkISFcIilcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ld1Rhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH0pXG5cblxufVxuXG5leHBvcnQgeyBPcGVuTmV3VGFza1BvcHVwLCBMb2FkVGFza3MsIENsZWFyVGFza3MgfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SGFuZGxlciwgUHJvamVjdCwgVGFzayB9IGZyb20gJy4vcHJvamVjdHMnO1xuLy8gaW1wb3J0IHsgTmV3UHJvamVjdEVudHJ5IH0gZnJvbSAnLi91aUNvbnRyb2xsZXInXG5pbXBvcnQgeyBPcGVuTmV3VGFza1BvcHVwIH0gZnJvbSAnLi90YXNrQ29udHJvbGxlclVJJztcbmltcG9ydCB7IE5ld1Byb2plY3RFbnRyeSB9IGZyb20gJy4vcHJvamVjdENvbnRyb2xsZXJVSSc7XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5ldy1wcm9qZWN0LWJ0blwiKTtcbmNvbnN0IGNyZWF0ZVRhc2tCdG49IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV3LXRhc2stYnRuXCIpO1xuXG5jcmVhdGVQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlIG5ldyBwcm9qZWN0XCIpO1xuICAgIE5ld1Byb2plY3RFbnRyeSgpXG59KVxuXG5jcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlIG5ldyB0YXNrXCIpO1xuICAgIGlmKFByb2plY3RIYW5kbGVyLnByb2plY3RzQXZhaWxpYmxlKCkpe1xuICAgICAgICBjb25zb2xlLmxvZyhQcm9qZWN0SGFuZGxlci5nZXRBbGxQcm9qZWN0cygpKVxuICAgICAgICBPcGVuTmV3VGFza1BvcHVwKClcbiAgICB9XG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==