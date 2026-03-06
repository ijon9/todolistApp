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
		clearTodos();
		displayTodos();
	}

	const removeTodo = (id) => {
		const arr = currProject.todoArr;
		for(let i=0; i<arr.length; i++) {
			if(arr[i].id === id) {
				arr.splice(i, 1);
			}
		}
		saveLocalStorage();
		clearTodos();
		displayTodos();
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
			// r.style.width = "25px";
			r.style.textAlign = "center";
			r.addEventListener("click", (e) => {
				removeProject(project.id);
			})
			c.appendChild(r);
			c.style.display = "grid";
			c.style.gridTemplateColumns = "3fr 1fr 1fr 1fr";
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
		if(projects.length === 0) {
			projects.push(new Project("default", []));
			currProject = projects[0];
		}
	}

	const saveLocalStorage = () => {
		localStorage.setItem("savedProjects", JSON.stringify(projects));
	}

	const clearLocalStorage = () => {
		localStorage.clear();
	}

	const createModal = () => {
		const b = document.createElement("button");
		b.id = "openModal";
		b.textContent = "Add todo";
		b.addEventListener("click", () => {
			m.showModal();
		})
		// Modal
		const m = document.createElement("dialog");
		m.id = "modal";
		const h = document.createElement("h1");
		h.textContent = "Add Todo";
		m.appendChild(h);
		// Title
		const title = document.createElement("input");
		title.setAttribute('type', 'text');
		title.id = "title";
		title.setAttribute('name', "title");
		const l = document.createElement('label');
		l.setAttribute('for', title.id);
		l.textContent = "Title: ";
		m.appendChild(l);
		m.appendChild(title);
		// Notes
		const notes = document.createElement("textarea");
		notes.id = "notes";
		notes.setAttribute("rows", "4");
		notes.setAttribute("cols", "50");
		const nl = document.createElement('label');
		nl.setAttribute('for', notes.id);
		nl.textContent = "Notes: ";
		m.appendChild(document.createElement("br"));
		m.appendChild(nl);
		m.appendChild(document.createElement("br"));
		m.appendChild(notes);
		// Duedate
		const duedate = document.createElement("input");
		duedate.id = "duedate";
		duedate.setAttribute("type", "date");
		const dl = document.createElement('label');
		dl.setAttribute('for', duedate.id);
		dl.textContent = "Due Date: ";
		m.appendChild(document.createElement("br"));
		m.appendChild(dl);
		m.appendChild(duedate); 
		// Priority
		// High
		const high = document.createElement("input");
		high.id = "high";
		high.setAttribute("type", "radio");
		high.setAttribute("name", "priority");
		high.setAttribute("value", "high");
		high.style.accentColor = "red";
		const hl = document.createElement("label");
		hl.setAttribute("for", high.id);
		hl.textContent = "High Priority";
		m.appendChild(document.createElement("br"));
		m.appendChild(hl);
		m.appendChild(high);
		// Medium
		const medium = document.createElement("input");
		medium.id = "medium";
		medium.setAttribute("type", "radio");
		medium.setAttribute("name", "priority");
		medium.setAttribute("value", "medium");
		medium.style.accentColor = "yellow";
		const ml = document.createElement("label");
		ml.setAttribute("for", medium.id);
		ml.textContent = "Medium Priority";
		m.appendChild(document.createElement("br"));
		m.appendChild(ml);
		m.appendChild(medium);
		// Low
		const low = document.createElement("input");
		low.id = "low";
		low.setAttribute("type", "radio");
		low.setAttribute("name", "priority");
		low.setAttribute("value", "low");
		low.setAttribute("checked", true);
		low.style.accentColor = "green";
		const ll = document.createElement("label");
		ll.setAttribute("for", low.id);
		ll.textContent = "Low Priority";
		m.appendChild(document.createElement("br"));
		m.appendChild(ll);
		m.appendChild(low);
		// Buttons
		const c = document.createElement("button");
		c.id = "closeModal";
		c.textContent = "close";
		c.addEventListener("click", () => {
			clearForm();
			m.close();
		})
		const s = document.createElement("button");
		s.textContent = "submit";
		s.addEventListener("click", (e) => {
			let title = document.getElementById("title").value;
			let notes = document.getElementById("notes").value;
			let dueDate = document.getElementById("duedate").value;
			let priority = 0;
			if(document.getElementById("high").checked) priority = 2;
			else if(document.getElementById("medium").checked) priority = 1;
			addToDo(title, notes, dueDate, priority);
			clearForm();
			m.close();
		})
		
		m.appendChild(document.createElement("br"));
		m.appendChild(document.createElement("br"));
		m.appendChild(s);
		m.appendChild(c);

		const todoDiv = document.getElementById("todos");
		todoDiv.appendChild(b);
		todoDiv.appendChild(m);
	}

	const clearForm = () => {
		document.getElementById("title").value = "";
		document.getElementById("notes").value = "";
		document.getElementById("duedate").value = "";
		document.getElementById("high").checked = false;
		document.getElementById("medium").checked = false;
		document.getElementById("low").checked = true;
	}

	// Store to local storage
	const addToDo = (title, notes, dueDate, priority) => {
		const todo = new Todo(title, dueDate, priority, notes);
		currProject.todoArr.push(todo);
		saveLocalStorage();
		clearTodos();
		displayTodos();
	}

	const displayTodos = () => {
		if(currProject === null) {
			document.getElementById("todos").textContent = "Select a project to add todos!";
			return;
		}
		for(let todo of currProject.todoArr) {
			const t = document.createElement("div");
			t.classList = ["todo-item"];
			// Title Div
			const titleDiv = document.createElement("div");
			titleDiv.textContent = todo.title;
			t.appendChild(titleDiv);
			// Right Div
			const rightDiv = document.createElement("div");
			rightDiv.style.display = "flex";
			// Date
			const date = document.createElement("div");
			date.textContent = todo.dueDate;
			date.style.marginRight = "10px";
			rightDiv.appendChild(date);
			// Priority
			const prio = document.createElement("div");
			prio.classList = ["p-circle"];
			prio.style.backgroundColor = (todo.priority === 2 ? "red" : (todo.priority === 1 ? "yellow" : "green"))
			prio.style.marginRight = "10px";
			rightDiv.appendChild(prio);
			// Delete button
			const deleteButton = document.createElement("button");
			deleteButton.textContent = 'x';
			deleteButton.addEventListener("click", (e) => {
				removeTodo(todo.id);
			})
			rightDiv.appendChild(deleteButton);
			t.appendChild(rightDiv);
			const todos = document.getElementById("todos");
			todos.appendChild(t);
		}
		createModal();
	}

	const clearTodos = () => {
		document.getElementById("todos").replaceChildren();
	}

	return { displayProjects, getLocalStorage, displayTodos }
})();

// document.getElementById("addProject").addEventListener("click", home.addProject);
// document.getElementById("flexible").addEventListener("click", home.displayProjects);
// document.getElementById("clear").addEventListener("click", home.clearProjects);
// document.getElementById("display").addEventListener("click", (e) => {
// 	home.clearProjects();
// 	home.displayProjects();
// });


home.getLocalStorage();
home.displayProjects();
home.displayTodos();