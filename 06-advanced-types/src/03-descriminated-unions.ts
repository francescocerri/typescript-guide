// Discriminated union -> pattern che si può utilizzare quando si lavora sui tipi di union
// Abbiamo una proprietà in comune in ogni oggetto che costituisce la nostra unione, type in questo caso

interface Bird {
	type: "bird"; // non è il valore di type, è un literal type, quindi diciamo che il type può essere solo questo valore
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird": {
			speed = animal.flyingSpeed;
			break;
		}
		case "horse": {
			speed = animal.runningSpeed;
			break;
		}
	}
	console.log("move speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 100 });
moveAnimal({ type: "horse", runningSpeed: 100 });
