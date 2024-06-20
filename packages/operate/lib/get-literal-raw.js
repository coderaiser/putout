'use strict';

const isString = (a) => typeof a === 'string';

module.exports.getLiteralRaw = (path) => {
    const {
        raw,
        extra,
        value,
    } = path.node || path;
    
    if (isString(raw))
        return raw;
    
    if (extra && isString(extra.raw))
        return extra.raw;
    
    return `'${maybeEncode(value)}'`;
};

function maybeEncode(a) {
    if (a.includes(`\\'`))
        return a;
    
    return a.replaceAll(`'`, `\\'`);
}
