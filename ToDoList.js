import { ToDo } from "./ToDo.js";
import { SendEmailService } from "./sendEmailService.js";

export class ToDoList {
    constructor(items, user, emailSent = false) {
        this.items = items;
        this.emailSent = emailSent;
        this.user = user;
    }

    save(itemName, description, user, createdAt = new Date()) {
        const lastTodo = this.items[this.items.length - 1];

        if(!user.isValid()) {
            return false;
        }
        
        if (this.isExistingTodo(itemName)) {
            return false;
        }
        
        if (!this.isDescriptionValid(description)) {
            return false;
        }
        
        if(!lastTodo) {
            const item = new ToDo(itemName, description, false, createdAt);
            this.items.push(item);
            return true;
        }
        
        if (this.isTimeDifferenceValid(createdAt)) {
            const item = new ToDo(itemName, description, false, createdAt);
            if(this.items.length === 8 && !this.emailSent) {
                this.sendTodoListNotification(user);
            }
            this.items.push(item);
            return true;
        }
        return false;
    }

    sendTodoListNotification(user) {
        if(this.items.length === 8 && !this.emailSent) {
            const sendEmailService = new SendEmailService();
            const subject = "Notification liste de tâches";
            const content = `Bonjour ${user.firstname}, vous avez maintenant 8 tâches ou plus dans votre liste.`;
            this.emailSent = sendEmailService.sendEmail(user.email, subject, content);
        }
    }

    isExistingTodo(itemName) {
        return this.items.find(item => item.name === itemName);
    }

    isTimeDifferenceValid(createdAt) {
        const lastTodo = this.items[this.items.length - 1];
        const timeDifferenceInMinutes = (createdAt - lastTodo.createdAt) / (1000 * 60);
        return timeDifferenceInMinutes >= 30;
    }

    isDescriptionValid(description) {
        return description.length <= 1000;
    }
}
