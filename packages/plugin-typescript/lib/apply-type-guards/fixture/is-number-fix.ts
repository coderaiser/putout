const isNumber = (a: unknown): a is number => !Number.isNaN(a) && typeof a === 'number';
