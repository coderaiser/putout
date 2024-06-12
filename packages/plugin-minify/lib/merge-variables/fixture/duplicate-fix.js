const {assign: a} = Object, g = null;
function b() {}

function c() {
    return b();
}

function d() {
    return c;
}

var A = {
    context: void 0,
    registry: void 0,
};
function f(e) {
    A.context = e;
}

function h(e) {
    return [
        e,
        a({}).equals,
    ];
}

function i() {
    return g;
}

const [j] = h(!1);
function k() {
    return [j, i];
}

function l(e) {
    f();
}

global.useTransition = k;
