// : number
function add(n1: number, n2: number) {
	return n1 + n2;
}

// : void, anche se in realtà ritornerebbe undefined
function printResult(num: number) {
	console.log("Result " + num);
}

// :undefined
function printResult2(num: number): undefined {
	return;
}

function addAnHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

printResult(add(5, 12));

addAnHandle(10, 20, (result) => {
	console.log(result);
});

let combinedValues: (a: number, b: number) => number;

combinedValues = add;
// combinedValues = printResult; not valid
