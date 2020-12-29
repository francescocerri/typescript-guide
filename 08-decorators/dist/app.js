"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Di solito i decorators hanno la lettera maiuscola
// I decoratori vengono eseguiti quando la classe è definita, non quando viene instanziata
// constructor è il parametro di default ed è il costruttore di Person
function Logger(constructor) {
    console.log("Loggin....");
    console.log(constructor);
}
// @ è un carattere speciale che ts riconosce, deve puntare a una funzione che è il decorator
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log("Creating person object");
    }
};
Person = __decorate([
    Logger
], Person);
// ------------------ Decorator factory --------------------
// La cosa che cambia è che pui passare diversi argomenti al decorator
function LoggerFactory(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// Può essere visto con un tool che gli altri sviluppatori possono usare (Angular le usa spesso)
function WithTemplate(template, hookId) {
    return function (constructor) {
        console.log("template");
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
}
// Si possono anche aggiungere + decorators, il return viene eseguito dal basso verso l'altro, mentre
// quello che c'è prima dall'alto verso il basso
let Person2 = class Person2 {
    constructor() {
        this.name = "Max";
        console.log("Creating person object");
    }
};
Person2 = __decorate([
    LoggerFactory("Logger"),
    WithTemplate("<h1>My person object</h1>", "app-div")
], Person2);
const pers = new Person2();
console.log(pers);
