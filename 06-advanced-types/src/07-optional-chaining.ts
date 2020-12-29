// il concatenamento opzionale,

const fetchUserData = {
	id: "u1",
	name: "Max",
	job: {
		title: "CEO",
		description: "my company",
	},
};

console.log(fetchUserData.job && fetchUserData.job.title);
// E' lo stesso controllo però fatto in ts
console.log(fetchUserData.job?.title);

// Nullish coalescing
const userInputText = null;

const storedData = userInput || "DEFAULT";
// Controlla se userInput è null oppure undefined, se lo è mette DEFAULT,
// QUesto vuole dire che diversamente da || se è '' o 0 salva '' o 0, non DEFAULT
const storedDataNullish = userInput ?? "DEFAULT";
