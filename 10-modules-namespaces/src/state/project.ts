namespace App {
	// Project State Management
	type Listener<T> = (items: T[]) => void;

	// Listener class
	class State<T> {
		protected listeners: Listener<T>[] = [];

		addListener(listenerFunc: Listener<T>) {
			this.listeners.push(listenerFunc);
		}
	}

	export class ProjectState extends State<Project> {
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
	export const projectState = ProjectState.getInstance();
}
