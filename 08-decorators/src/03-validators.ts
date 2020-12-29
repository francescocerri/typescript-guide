interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[]; // ["required", "positive"]
	};
}

const registeredValidator: ValidatorConfig = {};

function Required(target: any, name: string) {
	registeredValidator[target.constructor.name] = {
		...registeredValidator[target.constructor.name],
		[name]: ["required"],
	};
}

function PositiveNumber(target: any, name: string) {
	registeredValidator[target.constructor.name] = {
		...registeredValidator[target.constructor.name],
		[name]: ["positive"],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidator[obj.constructor.name];
	if (!objValidatorConfig) return true;
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return true;
}

class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", (event) => {
	event.preventDefault();
	const titleEl = document.getElementById("title") as HTMLInputElement;
	const priceEl = document.getElementById("price") as HTMLInputElement;
	const title = titleEl.value;
	const price = +priceEl.value;

	// const createCourse = new Course(title, price);
});

const createCourse = new Course("Prova", 1);
if (!validate(createCourse)) {
	alert("Invalid input");
}
console.log(createCourse);
