export class ToDo {
    constructor(name, description, isChecked = false, createdAt = new Date()) {
        this.name = name;
        this.description = description;
        this.isChecked = isChecked;
        this.createdAt = createdAt;
    }

    toggleCheck() {
        this.isChecked = !this.isChecked;
    }

    isItemChecked() {
        return this.isChecked;
    }
}
