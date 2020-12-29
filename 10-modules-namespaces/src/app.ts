// con 3 slash e' una sintassi particolare id TS
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
// In questo caso utilizzando lo steso namespaces di reference è come se avessimo importato tutte le interfacce
// Nel caso di project-models in ts funziona, ma poi il risultato dentro dist dà errori perchè non trova il progetto
// questo perchè i file sono compilati in maniera a sè stante e viene rotta questa reference, per questo facciamo una
// modifica al tsconfig.json, dicendogli di creare solo un file con tutto il necessario (outFile)
namespace App {
	const prjInput = new ProjectInput();
	const activeProjectList = new ProjectList("active");
	const finishedProjectList = new ProjectList("finished");
	console.log(prjInput);
	console.log(activeProjectList);
	console.log(finishedProjectList);
}
