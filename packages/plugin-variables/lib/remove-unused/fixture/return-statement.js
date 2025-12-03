const one = 1;
const two = 2;
const three = 3;
const four = 4;

function f1() {
    return one;
}

function f2() {
    return `${two}`
}

function f3() {
    return {
        msg: `${2}${three}`,
    }
}

function f4() {
    return [
        four,
    ];
}

function f5() {
    return function hello() {
    }
}

