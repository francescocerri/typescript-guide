import { Component } from "./base-component";
import { IValidatable, validate } from "../utils/validation";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project";
// project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	// set all input fields
	constructor() {
		super("project-input", "app", true, "user-input");
		this.templateElement = document.getElementById(
			"project-input"
		)! as HTMLTemplateElement;
		this.titleInputElement = this.element.querySelector(
			"#title"
		) as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			"#description"
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			"#people"
		) as HTMLInputElement;

		this.configure();
		this.renderContent();
	}

	configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}

	renderContent() {}
	// return a tuple
	private gatherUserInput(): [string, string, number] | undefined {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidation: IValidatable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidation: IValidatable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};
		const peopleValidation: IValidatable = {
			value: +enteredPeople,
			required: true,
		};

		if (
			!validate(titleValidation) ||
			!validate(descriptionValidation) ||
			!validate(peopleValidation)
		) {
			alert("Invalid input");
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInputs() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}

	@AutoBind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			// Aggiungiamo all'instanza globale il nuovo progetto
			projectState.addProject(title, description, people);
			this.clearInputs();
		}
	}
}
