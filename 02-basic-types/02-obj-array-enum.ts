// Not recommended if there are only this 2 values, because ts recognize their value
// const person: {
//     name: string,
//     age: number,
// } = {
// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: [number, string], // tuple an array with exactly this values
// } = {
// 	name: "Francesco",
// 	age: 24,
//     hobbies: ["Sports", "Cooking"],
//     role: [2, 'author']
// };

// person.role.push('Admin'); Push is allow, but it's strange
// person.role[1] = 10; Not valid
// person.role = [3, 'Abc', 'Cde']; Not valid, because there are 3 values

// O così o con enum è uguale
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
// può anche partire da un numero diverso
enum Role { ADMIN = 5, READ_ONLY, AUTHOR };

const person = {
	name: "Francesco",
	age: 24,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN
};


let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person);

