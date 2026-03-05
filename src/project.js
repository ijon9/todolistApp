export default class Project {
    constructor(name, arr) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todoArr = arr;
    }

    add(todo) {
		this.todoArr.push(todo);
	}
}