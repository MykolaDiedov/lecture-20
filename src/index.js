const deleteElement = 1;
class List {
    tasks = [];

    addTasks(text) {
        const task = {
            text: text,
            id: Date.now(),
            isComplete: false,
        };

        this.tasks.push(task);
    }
    deleteTasks(id) {
        const index = this.getTasksIndexById(id);
        this.tasks.splice(index, deleteElement);
    }

    renameTasks(id, text) {
        const index = this.getTasksIndexById(id);

        this.tasks[index].text = text;
    }
    getTasksIndexById(id) {
        return this.tasks.findIndex((item) => item.id === id);
    }

}
class ToDoList extends List {
    getStatistics() {
        const result = {
            total: this.tasks.length,
        };
        const completed = this.tasks.filter((i) => i.isComplete).length;

        result.completed = completed;
        result.inComplete = result.total - completed;

        return result;
    }
    setTasksAsComplete(id) {

        const index = this.getTasksIndexById(id);

        this.tasks[index].isComplete = true;

    }
    submitTasksToLocalStorage(name) {
        const obj = JSON.stringify(this.tasks);
        localStorage.setItem(name, obj);
    }
    readFromLocalStorage(name) {
        this.name = name;
        const returnObj = JSON.parse(localStorage.getItem(name));
        return returnObj;
    }
}
new ToDoList();