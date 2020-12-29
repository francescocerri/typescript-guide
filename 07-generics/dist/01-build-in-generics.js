"use strict";
const names = ["Max", "Manuel"];
const namesEQ = ["Fra"]; // come tipo è uguale a quello sopra string[]
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("done");
    }, 2000);
});
