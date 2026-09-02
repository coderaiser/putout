const isNumber = (a): a is number => !Number.isNaN(a) && typeof a === 'number';
