// Questo decorator è di una proprietà
// in questo caso riceve 2 proprietà, il primo il prototype,
function Log(target: any, propertyName: string | Symbol) {
	console.log("Property decorator");
	console.log(target, propertyName);
	// propertyName sarò title
}

// Possiamo ritornare un nuovo descriptor
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Access decorator");
	console.log(target); // prototype
	console.log(name); // price
	console.log(descriptor); // oggetto dove abbiamo il set
}

// E' possibile ritornare qualcosa
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Method decorator");
	console.log(target); // prototype
	console.log(name); // getPriceWithTax string
	console.log(descriptor); // { value: getPriceWithTax function }
}

function Log4(target: any, name: string, position: number) {
	console.log("Parameter decorator");
	console.log(target); // prototype
	console.log(name); // tax string
	console.log(position); // 0, position argument in function
}

class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error("Invalid price, should be positive!!!");
		}
	}
	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this.price * (1 + tax);
	}
}

function AutoBind(
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	const abjDescriptor: PropertyDescriptor = {
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
	message = "This works!";

	@AutoBind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();
p.showMessage();
const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage.bind(p));
// non c'è più bisogno del bind perchè c'è l'auto bind che lo fà
button.addEventListener("click", p.showMessage);
