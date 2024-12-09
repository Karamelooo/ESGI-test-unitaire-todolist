import { expect, test } from "vitest";
import { ToDoList } from "./ToDoList.js";
import { User } from "./User.js";

const baseDate = new Date();
const user = new User('test@test.ee', 'nom', 'prenom', 'lskfA1sdlfjjl', '1990-01-01');

const toDoList = new ToDoList([], user);

toDoList.save('titre1', 'description1', user, new Date(baseDate - 300 * 60 * 1000));
toDoList.save('titre2', 'description2', user, new Date(baseDate - 270 * 60 * 1000));
toDoList.save('titre3', 'description3', user, new Date(baseDate - 240 * 60 * 1000));
toDoList.save('titre4', 'description4', user, new Date(baseDate - 210 * 60 * 1000));
toDoList.save('titre5', 'description5', user, new Date(baseDate - 180 * 60 * 1000));
toDoList.save('titre6', 'description6', user, new Date(baseDate - 150 * 60 * 1000));
toDoList.save('titre7', 'description7', user, new Date(baseDate - 120 * 60 * 1000));
toDoList.save('titre8', 'description8', user, new Date(baseDate - 90 * 60 * 1000));
toDoList.save('titre9', 'description9', user, new Date(baseDate - 60 * 60 * 1000));
toDoList.save('titre10', 'description10', user, new Date(baseDate - 30 * 60 * 1000));

toDoList.items[0].toggleCheck();

test("L'utilisateur a-t-il une liste de tâches ?", () => {
    expect(toDoList.items).toBeDefined();
});

test("L'utilisateur a-t-il moins de 11 tâches ?", () => {
    expect(toDoList.items.length).toBeLessThan(11);
});

test("La différence entre la dernière todo et maintenant est-elle de 30 minutes ou plus ?", () => {
    expect(toDoList.isTimeDifferenceValid(baseDate)).toBe(true);
});

test("La différence entre dernière todo et maintenant est-elle de moins de 30 minutes ?", () => {
    expect(toDoList.isTimeDifferenceValid(new Date(baseDate - 29 * 60 * 1000))).toBe(false);
});

test("L'utilisateur est-il valide ?", () => {
    expect(user.isValid()).toBe(true);
});

test("Le nom 'titre11' est-il disponible ?", () => {
    expect(toDoList.isExistingTodo('titre11')).toBe(undefined);
});

test("Le nom 'titre10' est-il déjà pris ?", () => {
    expect(toDoList.isExistingTodo('titre10')).toBeDefined();
});

test("La description suivante est-elle inférieure à 1000 caractères ?", () => {
    let description = '';
    for (let i = 0; i <= 999; i++) {
        description += 'a';
    }
    expect(toDoList.isDescriptionValid(description)).toBe(true);
});

test("La description suivante est-elle supérieure à 1000 caractères ?", () => {
    let description = '';
    for (let i = 0; i <= 1000; i++) {
        description += 'a';
    }
    expect(toDoList.isDescriptionValid(description)).toBe(false);
});

test("L'utilisateur a-t-il reçu un email s'il a 8 tâches ou plus ?", () => {
    expect(toDoList.emailSent).toBe(true);
});

test("La todo 'titre1' est-elle cochée ?", () => {
    expect(toDoList.items[0].isItemChecked()).toBe(true);
});

test("La todo 'titre2' est-elle non cochée ?", () => {
    expect(toDoList.items[1].isItemChecked()).toBe(false);
});