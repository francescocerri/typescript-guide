"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    // Funzione legata alla classe che viene eseguita al momento della creazione dell'oggetto
    function Department(id, n) {
        // protected è accessibile da dentro la classe e da altre classi da cui è estesa
        this.employees = [];
        this.id = id;
        this.name = n;
    }
    // shortcut initialization
    // In questo caso mettendo private o public prima, vuol dire che si vuole proprio creare una proprietà per
    // questa classe, , quindi non c'è bisogno di mettere nella classe private id: string
    //constructor(private id: string, public name: string) {
    //	this.id = id;
    //	this.name = n;
    //}
    // un metodo a cui possiamo accedere senza creare un istanza di quella classe
    Department.createEmployee = function (name) {
        return { name: name };
    };
    Department.prototype.describe = function () {
        console.log("Department: " + this.name);
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployee = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    Department.fiscalYear = 2020;
    return Department;
}());
// Inheritance
// Eredita tutte le proprietà e i metodi di Department
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = 
        // super chiama il costruttore di Department, quindi vuole i 2 parametri che ha il costruttore
        _super.call(this, id, "IT") || this;
        _this.admins = admins;
        return _this;
    }
    return ITDepartment;
}(Department));
var AccountDepartment = /** @class */ (function (_super) {
    __extends(AccountDepartment, _super);
    function AccountDepartment(id, reports) {
        var _this = 
        // super chiama il costruttore di Department, quindi vuole i 2 parametri che ha il costruttore
        _super.call(this, id, "Account") || this;
        _this.reports = reports;
        _this.lastReport = reports[0];
        return _this;
    }
    Object.defineProperty(AccountDepartment.prototype, "mostRecentReport", {
        // Il metodo get deve restituire qualcosa
        // In questo caso si potrà utilizzare con la notazione puntata per accedere alla proprietà lastReport
        // facendo più controlli, per richiamarla lo si utilizzerà come proprietà non come metodo
        get: function () {
            if (this.lastReport)
                return this.lastReport;
            throw new Error("No report found");
        },
        // Il parametro è obbligatorio
        set: function (value) {
            if (!value)
                throw new Error("No value...");
            this.addReport(value);
        },
        enumerable: false,
        configurable: true
    });
    // In questo caso viene utilizzato questo addEmployee invece che quello di Department, override
    AccountDepartment.prototype.addEmployee = function (name) {
        if (name === "Max")
            return;
        // questo lo possiamo fare perchè è protected, se fosse stata private no
        this.employees.push(name);
    };
    AccountDepartment.prototype.addReport = function (text) {
        this.reports.push(text);
        this.lastReport = text;
    };
    AccountDepartment.prototype.getReport = function () {
        console.log(this.reports);
    };
    return AccountDepartment;
}(Department));
// ---------ABSTRACT SECTION--------------
var Groups = /** @class */ (function () {
    function Groups(id, name) {
        this.id = id;
        this.name = name;
        this.id = id;
        this.name = name;
    }
    return Groups;
}());
// Singleton -> ci si assicura che ci sarà solo un istanza di quella determinata classe
// Si fà aggiungendo il private nel costruttore, quindi non si potrà usare il new
var ITGroup = /** @class */ (function (_super) {
    __extends(ITGroup, _super);
    function ITGroup(id, name) {
        return _super.call(this, id, name) || this;
    }
    // describe basato sull'abstract
    ITGroup.prototype.describe = function () {
        return this.name;
    };
    // con il costruttore privato, possiamo utilizzare i metodo statici per farci avere l'istanza.
    // in questo caso non ci saranno istanze diverse perchè il getInstance ritorna il valore precedente
    // se esiste già. E' come se si potesse fare un solo new alla volta
    ITGroup.getInstance = function () {
        if (ITGroup.instance) {
            return ITGroup.instance;
        }
        this.instance = new ITGroup("11-11", "III");
        return this.instance;
    };
    return ITGroup;
}(Groups));
// Utilizzo metodi statici
var employee1 = Department.createEmployee("Ciccio");
console.log(employee1);
console.log(Department.fiscalYear);
//Singleton -> il new non è permesso, quindi possiamo accedere solo ai metodi statici
// const itGroup = new ITGroup(1, 'ITT');
var accounting = new Department("11-000", "Accounting");
accounting.describe();
accounting.addEmployee("Max");
accounting.addEmployee("Fra");
// Questo in teoria è permesso, ma non sarebbe corretto, visto che abbiamo un metodo apposta per aggiungere
// Mettendolo private questo non è possibile, perchè non è dentro la classe
// accounting.employees[2] = "Ciccio";
accounting.printEmployee();
var itAccounting = new ITDepartment("22-000", ["Max"]);
itAccounting.addEmployee("Gigi");
itAccounting.printEmployee();
// ------ GETTER SETTER ----------
var depAccounting = new AccountDepartment("22-000", ["Prova"]);
depAccounting.mostRecentReport = "Recent";
// mostRecentReport è il getter di lastReport, viene chiamato come una proprietà, non un metodo
console.log(depAccounting.mostRecentReport);
depAccounting.addEmployee("Max");
depAccounting.printEmployee();
