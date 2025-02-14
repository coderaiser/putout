const {fromEntries} = Object;
const {entries} = Object;
const {freeze} = Object;
const {defineProperty} = Object;

defineProperty(fn, 'name', {
    value: 'hello',
});

freeze({});

entries(a);

fromEntries(['a', 'b']);
