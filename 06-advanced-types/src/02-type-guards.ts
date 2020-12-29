type Comb = string | number;
type Num = number | boolean;

function add(a: Comb, b: Comb) {
	// questo controllo è detto type guard
	if (typeof a === "string" || typeof b === "string")
		return a.toString() + b.toString();
	return a + b;
}

type AdminTG = {
	name: string;
	privileges: string[];
};

type EmployeeTG = {
	name: string;
	startDate: Date;
};

type ElevatedEmployeeTG = AdminTG & EmployeeTG;

type UnknownEmployee = EmployeeTG | AdminTG;

function printEmployeeInformation(emp: UnknownEmployee) {
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

const e1TG: ElevatedEmployee = {
	name: "max",
	privileges: ["a"],
	startDate: new Date(),
};

printEmployeeInformation(e1TG);
// funziona anche così
printEmployeeInformation({ name: "Fra", startDate: new Date() });

class Car {
	drive() {
		console.log("Driving");
	}
}

class Truck {
	drive() {
		console.log("Driving Truck");
	}

	loadCargo(amount: number) {
		console.log(amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
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

// in definitiva il type guard verifica se esiste ua determinata proprietà prima di utilizzarla
