type AddFn = (a: number, b: number) => number;
// The equivalent of AddFn
interface IAddFn {
	(a: number, b: number): number;
}

let add: AddFn;

add = (n1, n2) => n1 + n2;
// Si usa per definire il tipo di un oggetto,
interface INamed {
	// Si usa per dire che la proprietà dopo essere stata inizializzata non può essere modificata
	readonly name?: string;
	// il ? indica che questo parametro non è obbligatorio, quindi può essere non passato
	outputName?: string;
}
// extends Aggiunge ai tipi di INamed i suoi
interface IPerson extends INamed {
	greet(phrase: string): void;
}

// un interfaccia per essere usata per una classe si utilizza implements
class Person implements IPerson {
	name?: string;
	constructor(name?: string) {
		if (name) this.name = name;
	}

	greet(phrase: string) {
		console.log(phrase);
		console.log(this.name);
	}
}

let user1: IPerson;

user1 = new Person("Fra");
user1.greet("Hi");
