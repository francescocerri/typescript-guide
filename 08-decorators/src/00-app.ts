// Di solito i decorators hanno la lettera maiuscola
// I decoratori vengono eseguiti quando la classe è definita, non quando viene instanziata
// constructor è il parametro di default ed è il costruttore di Person
function Logger(constructor: Function) {
	console.log("Loggin....");
	console.log(constructor);
}

// @ è un carattere speciale che ts riconosce, deve puntare a una funzione che è il decorator
@Logger
class Person {
	name = "Max";

	constructor() {
		console.log("Creating person object");
	}
}

// ------------------ Decorator factory --------------------

// La cosa che cambia è che pui passare diversi argomenti al decorator
function LoggerFactory(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}
// Può essere visto con un tool che gli altri sviluppatori possono usare (Angular le usa spesso)
function WithTemplate(template: string, hookId: string) {
	return function (originalConstructor: any) {
		console.log("template");
		const hookEl = document.getElementById(hookId);
		const p = new originalConstructor();
		if (hookEl) {
			hookEl.innerHTML = template;
			hookEl.querySelector("h1")!.textContent = p.name;
		}
	};
}

function WithTemplateReturnConst(template: string, hookId: string) {
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		// Possiamo ritornare una funzione, un costruttore o una nuova classe
		// in questo caso tutto questo render verrà eseguito solo se ho un istanza di Person e
		// non appena abbiamo definito la classe
		return class extends originalConstructor {
			constructor(...args: any[]) {
				super();
				console.log("template");
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					// possiamo usare this
					hookEl.querySelector("h1")!.textContent = this.name;
				}
			}
		};
	};
}
// Si possono anche aggiungere + decorators, il return viene eseguito dal basso verso l'altro, mentre
// quello che c'è prima dall'alto verso il basso
@LoggerFactory("Logger")
// @WithTemplate("<h1>My person object</h1>", "app-div")
@WithTemplateReturnConst("<h1>My person object</h1>", "app-div")
class Person2 {
	name = "Max";

	constructor() {
		console.log("Creating person object");
	}
}

const pers = new Person2();
console.log(pers);
