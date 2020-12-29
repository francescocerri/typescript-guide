class Department {
	static fiscalYear: number = 2020;
	// Con il readonly si può inizializzare solo nel costruttore, poi non puoi più modificarlo
	private readonly id: string;
	// private è accessibile sono dentro la classe
	private name: string;
	// protected è accessibile da dentro la classe e da altre classi da cui è estesa
	protected employees: string[] = [];
	// Funzione legata alla classe che viene eseguita al momento della creazione dell'oggetto
	constructor(id: string, n: string) {
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
	static createEmployee(name: string) {
		return { name };
	}

	describe() {
		console.log("Department: " + this.name);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployee() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

// Inheritance
// Eredita tutte le proprietà e i metodi di Department
class ITDepartment extends Department {
	admins: string[];
	constructor(id: string, admins: string[]) {
		// super chiama il costruttore di Department, quindi vuole i 2 parametri che ha il costruttore
		super(id, "IT");
		this.admins = admins;
	}
}

class AccountDepartment extends Department {
	private lastReport: string;

	// Il metodo get deve restituire qualcosa
	// In questo caso si potrà utilizzare con la notazione puntata per accedere alla proprietà lastReport
	// facendo più controlli, per richiamarla lo si utilizzerà come proprietà non come metodo
	get mostRecentReport() {
		if (this.lastReport) return this.lastReport;
		throw new Error("No report found");
	}
	// Il parametro è obbligatorio
	set mostRecentReport(value: string) {
		if (!value) throw new Error("No value...");
		this.addReport(value);
	}

	constructor(id: string, private reports: string[]) {
		// super chiama il costruttore di Department, quindi vuole i 2 parametri che ha il costruttore
		super(id, "Account");
		this.lastReport = reports[0];
	}
	// In questo caso viene utilizzato questo addEmployee invece che quello di Department, override
	addEmployee(name: string) {
		if (name === "Max") return;
		// questo lo possiamo fare perchè è protected, se fosse stata private no
		this.employees.push(name);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	getReport() {
		console.log(this.reports);
	}
}

// ---------ABSTRACT SECTION--------------
abstract class Groups {
	constructor(private id: string, public name: string) {
		this.id = id;
		this.name = name;
	}

	// Deve essere messa in una classe astratta
	// Stiamo dicendo che nel caso si crea una classe che estende questa, si è obbligati
	// a creare un proprio metodo describe
	abstract describe(): void;
}

// Singleton -> ci si assicura che ci sarà solo un istanza di quella determinata classe
// Si fà aggiungendo il private nel costruttore, quindi non si potrà usare il new
class ITGroup extends Groups {
	private static instance: ITGroup;

	private constructor(id: string, name: string) {
		super(id, name);
	}

	// describe basato sull'abstract
	describe() {
		return this.name;
	}

	// con il costruttore privato, possiamo utilizzare i metodo statici per farci avere l'istanza.
	// in questo caso non ci saranno istanze diverse perchè il getInstance ritorna il valore precedente
	// se esiste già. E' come se si potesse fare un solo new alla volta
	static getInstance() {
		if (ITGroup.instance) {
			return ITGroup.instance;
		}
		this.instance = new ITGroup("11-11", "III");
		return this.instance;
	}
}

// Utilizzo metodi statici
const employee1 = Department.createEmployee("Ciccio");
console.log(employee1);
console.log(Department.fiscalYear);

//Singleton -> il new non è permesso, quindi possiamo accedere solo ai metodi statici
// const itGroup = new ITGroup(1, 'ITT');

const accounting = new Department("11-000", "Accounting");
accounting.describe();

accounting.addEmployee("Max");
accounting.addEmployee("Fra");
// Questo in teoria è permesso, ma non sarebbe corretto, visto che abbiamo un metodo apposta per aggiungere
// Mettendolo private questo non è possibile, perchè non è dentro la classe
// accounting.employees[2] = "Ciccio";
accounting.printEmployee();

const itAccounting = new ITDepartment("22-000", ["Max"]);

itAccounting.addEmployee("Gigi");
itAccounting.printEmployee();

// ------ GETTER SETTER ----------
const depAccounting = new AccountDepartment("22-000", ["Prova"]);
depAccounting.mostRecentReport = "Recent";
// mostRecentReport è il getter di lastReport, viene chiamato come una proprietà, non un metodo
console.log(depAccounting.mostRecentReport);

depAccounting.addEmployee("Max");
depAccounting.printEmployee();
