"use strict";
function add(a, b) {
    // questo controllo è detto type guard
    if (typeof a === "string" || typeof b === "string")
        return a.toString() + b.toString();
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log(emp.name);
    // la emp.privileges avrebbe dato errore
    if ("privileges" in emp) {
        // questo non dà errore
        console.log(emp.privileges);
    }
    if ("startDate" in emp) {
        console.log(emp.startDate);
    }
    // questo darebbe errore al livello della funzione perchè TSC non può garantire che esista, essendo che privileges
    // è presente solo per AdminTG, quindi và controllata prima l'esistenza
    // console.log(emp.privileges);
}
var e1TG = {
    name: "max",
    privileges: ["a"],
    startDate: new Date(),
};
printEmployeeInformation(e1TG);
// funziona anche così
printEmployeeInformation({ name: "Fra", startDate: new Date() });
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log("Driving");
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log("Driving Truck");
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log(amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // dà errore perchè non sempre esiste
    // vehicle.loadCargo(10);
    if ("loadCargo" in vehicle) {
        vehicle.loadCargo(100);
    }
    // controllo più carino
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
}
useVehicle(v1);
useVehicle(v2);
