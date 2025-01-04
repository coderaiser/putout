report();
x();

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
});

export function report() {
    return 'Use Arrow';
}

function x() {
    return 'y';
}

const y = () => 'x';
