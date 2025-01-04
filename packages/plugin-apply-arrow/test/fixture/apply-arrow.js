report();
x();

export function replace() {
    return {
        'if __a > __b': 'if (__a > __b)',
    };
}


export function report () {
    return 'Use Arrow';
}

function x() {
    return 'y';
}

function y() {
    return 'x';
}