const BODIES = {
    function: `typeof __a === 'function'`,
    string: `typeof __a === 'string'`,
    number: `typeof __a === 'number'`,
    boolean: `typeof __a === 'boolean'`,
    undefined: `typeof __a === 'undefined'`,
    symbol: `typeof __a === 'symbol'`,
};

module.exports.replace = () => ({
    [BODIES.function]: 'isFn(__a)',
    [BODIES.string]: 'isString(__a)',
    [BODIES.number]: 'isNumber(__a)',
    [BODIES.boolean]: 'isBool(__a)',
    [BODIES.undefined]: 'isUndefined(__a)',
    [BODIES.symbol]: 'isSymbol(__a)',
});
