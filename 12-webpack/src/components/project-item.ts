import { IDraggable } from "../models/interfaces/d&d";
import { Component } from "./base-component";
import { AutoBind } from "../decorators/autobind";
import { Project } from "../models/project";
// Project item class
// Single project item render
// Implementa l'interfaccia, così ci obbliga ad aggiungere 2 metodi
export class ProjectItem
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
