// Mettendo i generics <T, U>, ed essendo che c'è un assign, TS capisce che il risultato è un intersezione dei 2
// Cioè T & U, e infatti dopo ci lascia usare la proprietà name
// T si usa spesso in questo caso, indica type, poi si và avanti con l'alfabeto, quindi U
// T quindi ha il riferimento del tipo { name: string } e U { age: 1 }, quello che viene ritornato è l'intersezione
function merge<T, U>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "max" }, { age: 1 });
const mergedObj2 = merge({ name: "max", hobbies: ["reading"] }, { age: 1 });
console.log(mergedObj.name);

// Si possono dare dei limit a questi generics, mettendogli delle constraints

function mergeConstraints<T extends object, U extends object>(
	objA: T,
	objB: U
) {
	return Object.assign(objA, objB);
}

// questo ci dà errore perchè 30 non è un oggetto, quindi queste constraints ci aiutano ad avere un controllo in più
//const mergedObj3 = mergeConstraints({ name: "max", hobbies: ["reading"] }, 30);
// nel caso vecchio invece funziona
const mergedObj4 = merge({ name: "max", hobbies: ["reading"] }, 30);

interface Lengthy {
	length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
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
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key];
}

// se non gli passiamo il campo dell'oggetto dà errore
console.log(extractAndConvert({ name: "Gigi" }, "name"));

// ---------------------- Generic classes ----------------------------------------

class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
// questo mi dà errore perchè gli ho detto che deve essere una stringa
// textStorage.addItem(10)
textStorage.addItem("ciccio");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "max" });
// objStorage.addItem({ name: "manu" });
// objStorage.removeItem({ name: "max" });
// // dà un risultato diverso perchè usiamo indexOf e non va bene per gli oggetti
// console.log(objStorage.getItems());

// ---------------------- Generic utility type ----------------------------------------
// Partial -> trasforma il tipo passato Partial<CourseGoal>, in un oggetto con tutte le proprietà opzionali, così possiamo inizializzarlo
// vuoto

interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let obj: Partial<CourseGoal> = {};
	obj.title = title;
	obj.description = description;
	obj.completeUntil = date;
	return obj as CourseGoal;
}

// Readonly type
// Stiamo dicendo che quello è un array di stringhe ma non modificabile, quindi non possiamo aggiungere elementi
const strings: Readonly<string[]> = ["max", "fra"];
// strings.push('Gigi');
// strings.pop();
