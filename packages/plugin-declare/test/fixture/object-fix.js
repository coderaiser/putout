const {
    freeze
} = Object;

const {
    defineProperty
} = Object;

defineProperty(fn, 'name', {
    value: 'hello',
});

freeze({});
