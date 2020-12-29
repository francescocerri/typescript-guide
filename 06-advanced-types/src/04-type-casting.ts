const paragraph = document.getElementById("message"); // non capisce che è un tag p, ma solo che è un elemento html
// Gli stiamo dicendo che tutto quello dopo <> è del tipo HTMLInputElement, in questo caso così riusciamo ad utilizzare il value
const userInput = <HTMLInputElement>document.getElementById("user-input");
const userInputEQ = document.getElementById("user-input") as HTMLInputElement; // stessa cosa di sopra

userInput.value = "ciao";
