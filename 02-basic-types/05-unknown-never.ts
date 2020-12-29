let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
// userName = userInput; errore, con any avrebbe funzionato
if (typeof userInput === "string") {
	userName = userInput; // Questo invece è permesso
}

//: never
function generateError(message: string, code: number): never {
	throw { message, errorCode: code };
}

const result = generateError("Error", 500);
// Qui non ritorna proprio niente perché crasha prima, in un void ritornerebbe undefined
console.log(result);
