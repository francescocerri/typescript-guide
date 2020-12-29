function add(n1, n2, showResult) {
    var result = n1 + n2;
    if (showResult) {
        console.log(result);
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var result = add(number1, number2, printResult);
