type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// Intersection type
// questa è un insieme dei 2 tipi,
// stessa cosa sarebbe stata con le interfacce
// interface ElevatedEmployee extends Admin, Employee
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "max",
	privileges: ["a"],
	startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

// Questo sarà un number, perchè è l'unico che è presente in entrambi
type Universal = Combinable & Numeric;

// quindi nel caso di oggetti l'intersection sarà la combinazione di queste proprietà
// nel caso di type singoli sarà l'unione di quelli
