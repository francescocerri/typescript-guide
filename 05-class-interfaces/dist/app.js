"use strict";
var add;
add = function (n1, n2) { return n1 + n2; };
// un interfaccia per essere usata per una classe si utilizza implements
var Person = /** @class */ (function () {
    function Person(name) {
        if (name)
            this.name = name;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase);
        console.log(this.name);
    };
    return Person;
}());
var user1;
user1 = new Person("Fra");
user1.greet("Hi");
