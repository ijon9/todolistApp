export default class Todo {
    constructor(title, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}