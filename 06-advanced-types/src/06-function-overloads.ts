type Comb1 = string | number;
type Num1 = number | boolean;

// Function overload -> Possiamo avere più modi per chiamare una funzione con parametri di tipi diversi
// se passiamo entrambi dei numeri, allora ritorna un numero
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Comb1, b: Comb1) {
	// questo controllo è detto type guard
	if (typeof a === "string" || typeof b === "string")
		return a.toString() + b.toString();
	return a + b;
}

// In questo caso il risultato è sicuramente un numero, ma ts non può saperlo il risultato è un Comb1
const result = add(1, 5);

const result2 = add("Fra", "Cerri");
result2.split(" "); // questo possiamo fare perchè ts sà che se passiamo 2 stringhe, viene ritornato una stringa
