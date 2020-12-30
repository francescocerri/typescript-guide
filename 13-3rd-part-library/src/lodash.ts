// Essendo una libreria in JS, TS dà errore perchè non lo riconosce con il linguaggio giusto,
// Per questo bisogna scaricare i types @types/lodash
import _ from "lodash";

// Nel caso in cui non esistano i types si possono usare declare
declare var GLOBAL: string; // diciamo a ts che esiste e che tipo ha
console.log(GLOBAL);
