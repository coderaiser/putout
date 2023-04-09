const initialValue = 0;

{
    let sumWithInitial = initialValue;
    
    for (const currentValue of array1) {
        sumWithInitial = previousValue + currentValue;
    }
}

// .reduceRight();
{
    let [reduceRight1] = x;
    
    for (const a of x.slice(1)) {
        reduceRight1 = a + reduceRight1;
    }
}
const reduceRight2 = [1, 2].reduceRight((a, b) => a + b, 1);
{
    let [array] = list;
    
    for (const accumulator of list.slice(1)) {
        array = accumulator.concat(array);
    }
}

// member expression: .concat();

const array1 = [
    [0, 1],
    [2, 3],
    [4, 5],
].reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

// binary operation: +
const sum1 = [1, 2, 3].reduce((a, b) => a + b);

{
    let [sum2] = list;
    
    for (const a of list.slice(1)) {
        sum2 = a + sum2;
    }
}
const obj = [1, 2, 3].reduce((a, b) => {
    a[b] = b;
    return a;
}, {});
