import { IDragTarget } from "../models/interfaces/d&d.js";
import { Component } from "./base-component.js";
import { AutoBind } from "../decorators/autobind.js";
import { Project, ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project.js";
import { ProjectItem } from "./project-item.js";

// ProjectList class, eredita la UI da Component
export class ProjectList
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
