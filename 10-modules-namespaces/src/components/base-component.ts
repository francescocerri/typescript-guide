namespace App {
	// Component base class
	// UI component
	// Così quando ereditiamo da questa classe possiamo specificare i tipi di host e element con i generic type
	// abstract perchè la classe non và instanziata, ma và utilizzata solo per l'ereditarietà
	export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
