const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);

// .reduceRight();
const reduceRight1 = x.reduceRight((a, b) => a + b);
const reduceRight2 = [1, 2].reduceRight((a, b) => a + b, 1);
const array = list.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

// member expression: .concat();
const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
);

// binary operation: +
const sum1 = [1,2,3].reduce((a, b) => a + b);
const sum2 = list.reduce((a, b) => a + b);
const obj = [1,2,3].reduce((a, b) => {a[b] = b; return a}, {});

