"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Questo decorator è di una proprietà
// in questo caso riceve 2 proprietà, il primo il prototype,
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
    // propertyName sarò title
}
// Possiamo ritornare un nuovo descriptor
function Log2(target, name, descriptor) {
    console.log("Access decorator");
    console.log(target); // prototype
    console.log(name); // price
    console.log(descriptor); // oggetto dove abbiamo il set
}
// E' possibile ritornare qualcosa
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target); // prototype
    console.log(name); // getPriceWithTax string
    console.log(descriptor); // { value: getPriceWithTax function }
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target); // prototype
    console.log(name); // tax string
    console.log(position); // 0, position argument in function
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price, should be positive!!!");
        }
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function AutoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const abjDescriptor = {
        configurable: true,
        enumerable: false,
        // nuovo
        get() {
            // sarà sempre il this di printer
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        },
    };
    // farà un override del vecchio descriptor
    return abjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This works!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
p.showMessage();
const button = document.querySelector("button");
// button.addEventListener("click", p.showMessage.bind(p));
// non c'è più bisogno del bind perchè c'è l'auto bind che lo fà
button.addEventListener("click", p.showMessage);
