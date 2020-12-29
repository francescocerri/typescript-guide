import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

const prjInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
console.log(prjInput);
console.log(activeProjectList);
console.log(finishedProjectList);
