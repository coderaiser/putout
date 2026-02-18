export const declare = () => ({
    maybeArray: 'const maybeArray = (a) => isArray(a) ? a : [a]',
    maybeArrayFrom: 'const maybeArrayFrom = (a) => isSet(a) ? Array.from(a) : maybeArray(a)',
    maybeEmptyArray: 'const maybeEmptyArray = (a) => !a ? [] : a',
    maybeFn: 'const maybeFn = (a) => isFn(a) ? a : noop',
    maybeFirst: 'const maybeFirst = (a) => isArray(a) ? a[0] : a',
    maybeCall: 'const maybeCall = (a, ...b) => isFn(a) && a(...b)',
});
