import {expect, test} from "vitest";
import {User} from "./User"

const user = new User('te1st@testte1st.ee', 'nom', 'prenom', 'lskfA1sdlfjjl', '1990-01-01')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

test("Format email", () => {
    expect(emailRegex.test(user.email)).toBeTruthy();
});

test("Nom renseigné", () => {
    expect(user.name).not.toBe('');
});

test("Prénom renseigné", () => {
    expect(user.firstname).not.toBe('');
});

test("Mot de passe correct", () => {
    expect(user.password).not.toBe('');
    expect(user.password.length).toBeGreaterThanOrEqual(8);
    expect(user.password.length).toBeLessThanOrEqual(40);
    expect(passwordRegex.test(user.password)).toBeTruthy();
});

const age = user.calculateAge();

test("Âge supérieur à 13", () => {
    expect(age).toBeGreaterThanOrEqual(13);
});

test("Classe de test", () => {
    expect(user.isValid()).toBeTruthy();
});