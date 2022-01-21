const noop = () => {};
const isFn = a => typeof a === 'function';

const {
    isArray
} = Array;

const maybeFn = a => isFn(a) ? a : noop;
const maybeEmptyArray = a => !a ? [] : a;
const maybeArray = a => isArray(a) ? a : [a];
fn([
    maybeArray(b),
    maybeEmptyArray(c),
    maybeFn(b),
]);

