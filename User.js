export class User {
    constructor(email, name, firstname, password, birthday) {
        this.email = email;
        this.name = name;
        this.firstname = firstname;
        this.password = password;
        this.birthday = birthday;
    }

    isValid() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        const age = this.calculateAge();
        return emailRegex.test(this.email)
        && this.name
        && this.firstname
        && this.password.length >= 8
        && this.password.length <= 40
        && passwordRegex.test(this.password)
        && age >= 13;
    }

    calculateAge() {
        const today = new Date();
        const birthDate = new Date(this.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}