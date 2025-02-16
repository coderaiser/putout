const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';
const isNumberLike = (a, b = Number(a)) => isNumber(b);
const value = Number(array[i + 1]);

if (isNumberLike(value))
    return;
