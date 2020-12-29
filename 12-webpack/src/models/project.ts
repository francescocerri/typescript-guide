// Project type
export enum ProjectStatus {
	Active,
	Finished,
}
// invece che usare un interfaccia si è creata una classe per poterla instanziare
export class Project {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public number: number,
		public status: ProjectStatus
	) {}
}
