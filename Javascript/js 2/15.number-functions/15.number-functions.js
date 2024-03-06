function isFloat(num) {
  return num % 1 > 0;
}

function isFloat2(num) {
  return !Number.sInteger(num);
}

Number.isFinite(Infinity); // -> true;
Number.isFinite(123); // -> false;

Number.isInteger(123); // -> true;
Number.isInteger(12.3); // -> false;

NaN == NaN; // -> false;
Number.isNaN(NaN); // -> true;
Number.isNaN(123); // -> false;
Number.isNaN("A"); // -> true;
Number.isNaN("A" - "b"); // -> true;

Number.parseInt("123"); // -> 123;
Number.parseInt("123.23"); // -> 123;
Number.parseInt("123asd"); // -> 123;
Number.parseInt("asd123"); // -> NaN;
Number.parseInt(""); // -> NaN;

Number.parseFloat("123"); // -> 123;
Number.parseFloat("123.23"); // -> 123.23;
Number.parseFloat("123asd"); // -> 123;
Number.parseFloat("asd123"); // -> NaN;
Number.parseFloat(""); // -> NaN;

Number(""); // -> 0;
Number("abc"); // -> NaN;
Number("123"); // -> 123;
Number("123.456"); // -> 123.456;
Number("123.456abc"); // -> NaN;

+""; // -> 0;
+"abc"; // -> NaN;
+"123"; // -> 123;
+"123.456"; // -> 123.456;
+"123.456abc"; // -> NaN;


let num = 5;
let num2 = 1.2345;
let num3 = 12;

num.toExponential(2); // -> '5.00e+0'

num.toFixed(2); // -> '5.00'
num2.toFixed(2); // -> '1.23'
num2.toFixed(3); // -> '1.234'
num2.toFixed(10); // -> '1.2345000000'

num.toString(); // -> '5'

num.toPrecision(2); // -> '5.0'
num.toPrecision(3); // -> '5.00'
num3.toPrecision(12); // -> '12.0000000000'
