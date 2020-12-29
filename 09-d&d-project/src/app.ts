// D&D interfaces
interface IDraggable {
	dragStartHandler(event: DragEvent): void;
	dragEndHandler(event: DragEvent): void;
}

interface IDragTarget {
	dragOverHandler(event: DragEvent): void;
	dropHandler(event: DragEvent): void;
	dragLeaveHandler(event: DragEvent): void;
}

// Project type
enum ProjectStatus {
	Active,
	Finished,
}
// invece che usare un interfaccia si è creata una classe per poterla instanziare
class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public number: number,
		public status: ProjectStatus
	) {}
}

// Project State Management
type Listener<T> = (items: T[]) => void;

// Listener class
class State<T> {
	protected listeners: Listener<T>[] = [];

	addListener(listenerFunc: Listener<T>) {
		this.listeners.push(listenerFunc);
	}
}

class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;
	// costruttore privato per garantire che è una classe singleton, cioè
	// il new non potrà essere chiamato da fuori
	private constructor() {
		super();
	}

	// si utilizzerà la getInstance, così da avere sempre la stessa instanza ovunque ci serva
	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			numOfPeople,
			ProjectStatus.Active
		);

		this.projects.push(newProject);
		// quando qualcosa cambia(tipo viene aggiunto un progetto), richiamiamo tutti i listener
		this.updateListeners();
	}

	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((prj) => prj.id === projectId);
		if (project && project.status !== newStatus) project.status = newStatus;
		this.updateListeners();
	}

	private updateListeners() {
		for (const listenerFunc of this.listeners) {
			listenerFunc(this.projects.slice());
		}
	}
}

// create a global instance
const projectState = ProjectState.getInstance();

// Validation
interface IValidatable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}
function validate(validatableInput: IValidatable) {
	let isValid = true;
	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}
	if (
		validatableInput.minLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length >= validatableInput.minLength;
	}
	if (
		validatableInput.maxLength != null &&
		typeof validatableInput.value === "string"
	) {
		isValid =
			isValid && validatableInput.value.length <= validatableInput.maxLength;
	}
	if (
		validatableInput.min != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value >= validatableInput.min;
	}
	if (
		validatableInput.max != null &&
		typeof validatableInput.value === "number"
	) {
		isValid = isValid && validatableInput.value <= validatableInput.max;
	}
	return isValid;
}

// autobind decrorator
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const abjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		// nuovo
		get() {
			// sarà sempre il this della classe
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		},
	};
	// farà un override del vecchio descriptor
	return abjDescriptor;
}

// Component base class
// UI component
// Così quando ereditiamo da questa classe possiamo specificare i tipi di host e element con i generic type
// abstract perchè la classe non và instanziata, ma và utilizzata solo per l'ereditarietà
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;

	// Get dom correct element, and set the new item
	constructor(
		templateId: string,
		hostId: string,
		insertAtStart: boolean,
		newElementId?: string
	) {
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostId)! as T;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNode.firstElementChild as U;
		if (newElementId) this.element.id = newElementId;

		// Aggiungere il nuovo elemento
		this.attach(insertAtStart);
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtBeginning ? "afterbegin" : "beforeend",
			this.element
		);
	}

	// quindi manca la concreata configurazione, e obblighiamo quindi ad ogni classe che eredita
	// queste info ad aggiungere questi metodi
	abstract configure(): void;
	abstract renderContent(): void;
}

// Project item class
// Single project item render
// Implementa l'interfaccia, così ci obbliga ad aggiungere 2 metodi
class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements IDraggable {
	private project: Project;

	get people() {
		if (this.project.number === 1) {
			return "1 person";
		} else {
			return `${this.project.number} people`;
		}
	}

	constructor(hostId: string, project: Project) {
		super("single-project", hostId, false, project.id);
		this.project = project;
		this.configure();
		this.renderContent();
	}
	@AutoBind
	dragStartHandler(event: DragEvent) {
		// vogliamo trasferire solo l'id
		event.dataTransfer!.setData("text/plain", this.project.id);
		event.dataTransfer!.effectAllowed = "move"; // ci stiamo muovendo, non copiando
	}
	@AutoBind
	dragEndHandler(_: DragEvent) {}

	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("p")!.textContent = this.project.description;
		this.element.querySelector("h3")!.textContent = this.people + " assigned";
	}
}

// ProjectList class, eredita la UI da Component
class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements IDragTarget {
	assignedProjects: Project[];
	// per creare automaticamente una proprietà con lo stesso nome
	constructor(private type: "active" | "finished") {
		// chiamiamo il costruttore della classe da cui stiamo ereditando
		super("project-list", "app", false, `${type}-projects`);
		this.assignedProjects = [];
		this.configure();
		this.renderContent();
	}

	@AutoBind
	dragOverHandler(event: DragEvent) {
		// se è quello che abbiamo messo noi
		if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
			event.preventDefault();
			const listEl = this.element.querySelector("ul")!;
			listEl.classList.add("droppable");
		}
	}
	@AutoBind
	dropHandler(event: DragEvent) {
		const prjId = event.dataTransfer!.getData("text/plain");
		projectState.moveProject(
			prjId,
			this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}
	@AutoBind
	dragLeaveHandler(_: DragEvent) {
		const listEl = this.element.querySelector("ul")!;
		listEl.classList.remove("droppable");
	}

	configure() {
		// quando viene aggiunto un nuovo progetto
		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);
		this.element.addEventListener("drop", this.dropHandler);
		projectState.addListener((projects: Project[]) => {
			// filter active and finished project
			const relevantProject = projects.filter((prj) => {
				if (this.type === "active") {
					return prj.status === ProjectStatus.Active;
				}
				return prj.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProject;
			this.renderProject();
		});
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent =
			this.type.toUpperCase() + "Projects";
	}

	// renderizza i progetti nello stato corretto
	private renderProject() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		// svuotare i valori che aveva prima per non avere duplicati, si poteva anche fare un filtro sotto
		listEl.innerHTML = "";
		for (const prjItems of this.assignedProjects) {
			new ProjectItem(this.element.querySelector("ul")!.id, prjItems);
		}
	}
}

// project input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
console.log(prjInput);
console.log(activeProjectList);
console.log(finishedProjectList);
