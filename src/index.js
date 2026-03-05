import './style.css'
import Todo from './todo.js'
import Project from './project.js'

const home = (() => {
	let currTodo = null;
	let currProject = null;
	let projects = [];

	const addProject = () => {
		const name = prompt("Enter a project name:");
		if(name !== '' && name !== null) projects.push(new Project(name, []));
		saveLocalStorage();	
		clearProjects();
		displayProjects();
	}

	const setCurrentProject = (project) => {
		if(project === currProject) currProject = null;
		else currProject = project;
		clearProjects();
		displayProjects();
		clearTodos();
		displayTodos();
	}

	const removeProject = (id) => {
		for(let i=0; i<projects.length; i++) {
			if(projects[i].id === id) {
				if(currProject !== null && currProject.id === id) currProject = null;
				projects.splice(i, 1);
			}
		}
		saveLocalStorage();
		clearProjects();
		displayProjects();
	}

	const displayProjects = () => {
		const projectDiv = document.getElementById("projects");
		for(let project of projects) {
			const c = document.createElement("div");
			const p = document.createElement('div');
			p.textContent = project.name;
			p.addEventListener("click", (e) => {
				setCurrentProject(project);
			})
			if(currProject != null && project.id === currProject.id) p.style.backgroundColor = "lightblue";
			p.classList = ["hand-cursor"];
			c.appendChild(p);
			const r = document.createElement("button");
			r.textContent = 'x';
			r.style.width = "25px";
			r.style.textAlign = "center";
			r.addEventListener("click", (e) => {
				removeProject(project.id);
			})
			c.appendChild(r);
			c.style.display = "grid";
			c.style.gridTemplateColumns = "1fr 1fr";
			projectDiv.appendChild(c);
		}
		const b = document.createElement("button");
		b.id = "addProject";
		b.textContent = "Add project"
		b.addEventListener("click", addProject);
		projectDiv.appendChild(b);
	}

	const clearProjects = () => {
		document.getElementById("projects").replaceChildren();
	}

	const getLocalStorage = () => {
		const ps = JSON.parse(localStorage.getItem("savedProjects"));
		if(ps !== null) projects = ps;
	}

	const saveLocalStorage = () => {
		localStorage.setItem("savedProjects", JSON.stringify(projects));
	}

	const clearLocalStorage = () => {
		localStorage.clear();
	}

	const displayTodos = () => {
		if(currProject === null) return;
		const b = document.createElement("button");
		b.id = "addTodo";
		b.textContent = "Add todo";
		const todoDiv = document.getElementById("todos");
		todoDiv.appendChild(b);
	}

	const clearTodos = () => {
		document.getElementById("todos").replaceChildren();
	}

	return { addProject, displayProjects, clearProjects, getLocalStorage, clearLocalStorage }
})();

// document.getElementById("addProject").addEventListener("click", home.addProject);
// document.getElementById("flexible").addEventListener("click", home.displayProjects);
document.getElementById("clear").addEventListener("click", home.clearProjects);
document.getElementById("display").addEventListener("click", (e) => {
	home.clearProjects();
	home.displayProjects();
});


home.getLocalStorage();
home.clearProjects();
home.displayProjects();