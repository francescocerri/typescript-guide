const names = ["Max", "Manuel"];

const namesEQ: Array<string> = ["Fra"]; // come tipo è uguale a quello sopra string[]

const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("done");
	}, 2000);
});
