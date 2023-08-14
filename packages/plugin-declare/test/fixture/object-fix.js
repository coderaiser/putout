const {isArray} = Array;
const entries = (a) => isArray(a) ? a.entries() : Object.entries(a);
const {freeze} = Object;
const {defineProperty} = Object;

defineProperty(fn, 'name', {
    value: 'hello',
});

freeze({});

entries(a);
