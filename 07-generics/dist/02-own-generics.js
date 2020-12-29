"use strict";
// Mettendo i generics <T, U>, ed essendo che c'è un assign, TS capisce che il risultato è un intersezione dei 2
// Cioè T & U, e infatti dopo ci lascia usare la proprietà name
// T si usa spesso in questo caso, indica type, poi si và avanti con l'alfabeto, quindi U
// T quindi ha il riferimento del tipo { name: string } e U { age: 1 }, quello che viene ritornato è l'intersezione
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "max" }, { age: 1 });
const mergedObj2 = merge({ name: "max", hobbies: ["reading"] }, { age: 1 });
console.log(mergedObj.name);
// Si possono dare dei limit a questi generics, mettendogli delle constraints
function mergeConstraints(objA, objB) {
    return Object.assign(objA, objB);
}
// questo ci dà errore perchè 30 non è un oggetto, quindi queste constraints ci aiutano ad avere un controllo in più
//const mergedObj3 = mergeConstraints({ name: "max", hobbies: ["reading"] }, 30);
// nel caso vecchio invece funziona
const mergedObj4 = merge({ name: "max", hobbies: ["reading"] }, 30);
function countAndPrint(element) {
    let description = "Got no value";
    if (element.length > 0) {
        description = "Got " + element.length;
    }
    return [element, description];
}
console.log(countAndPrint("HI"));
console.log(countAndPrint(["sports", "Cooking"]));
console.log(countAndPrint([]));
// ---------------------- keyof ----------------------------------------
//  U extends keyof T, serve per dirgli che U sarà una chiave contenuta in T, senza questo darebbe errore
// Perchè non può garantire che la stringa passata sia una chiave dell'oggetto
function extractAndConvert(obj, key) {
    return obj[key];
}
// se non gli passiamo il campo dell'oggetto dà errore
console.log(extractAndConvert({ name: "Gigi" }, "name"));
// ---------------------- Generic classes ----------------------------------------
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
// questo mi dà errore perchè gli ho detto che deve essere una stringa
// textStorage.addItem(10)
textStorage.addItem("ciccio");
const numberStorage = new DataStorage();
numberStorage.addItem(2);
function createCourseGoal(title, description, date) {
    let obj = {};
    obj.title = title;
    obj.description = description;
    obj.completeUntil = date;
    return obj;
}
// Readonly type
// Stiamo dicendo che quello è un array di stringhe ma non modificabile, quindi non possiamo aggiungere elementi
const strings = ["max", "fra"];
// strings.push('Gigi');
// strings.pop();
