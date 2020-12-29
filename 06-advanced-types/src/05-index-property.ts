// una funzione che consente di creare oggetti più flessibili, rispetto alle proprietà che potrebbero contenere
// Qui a priori non sappiamo i campi che potremmo avere, sappiamo il tio che deve contenere

interface ErrorContainer {
	// { email: 'Not valid email', username: 'Mist start with character' }
	[prop: string]: string;
}

const errorBag: ErrorContainer = {
	email: "Not valid email",
	username: "Not valid",
};
