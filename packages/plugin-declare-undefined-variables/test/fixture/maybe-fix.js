const maybeArray = a => isArray(a) ? a : [a];
const maybeEmptyArray = a => !a ? [] : a;
const maybeFn = a => isFn(a) ? a : noop;

const {
    isArray
} = Array;

const isFn = a => typeof a === 'function';
const noop = () => {};
fn([
    maybeArray(b),
    maybeEmptyArray(c),
    maybeFn(b),
]);

