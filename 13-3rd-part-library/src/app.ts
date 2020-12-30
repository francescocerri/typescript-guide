import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.model";

const products = [
	{ title: "A Carpet", price: 29.99 },
	{ title: "A Book", price: 10.99 },
];

const newProd = new Product("", -5.99);
// validiamo un instanza di una classe a cui abbiamo aggiunto i validators
validate(newProd).then((errors) => {
	if (errors.length > 0) {
		console.log("VALIDATION ERRORS!");
		console.log(errors);
	} else {
		console.log(newProd.getInformation());
	}
});

// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// Trasforma ogni oggetto in un istanza della classe, così abbiamo tutti i metodi, per esempio .getInformation()
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
	console.log(prod.getInformation());
}
