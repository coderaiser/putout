'use strict';

const tryCatch = require('try-catch');
const stub = () => () => {};

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports.getFormatter = (formatter, exit) => {
    const [name, formatterOptions] = maybeArray(formatter);
    
    return [
        getReporter(name, exit),
        formatterOptions,
    ];
};

module.exports.getReporter = getReporter;
function getReporter(name, exit) {
    let e;
    let reporter;
    
    if (name === 'none') {
        return stub();
    }
    
    [e, reporter] = tryCatch(require, `@putout/formatter-${name}`);
    
    if (!e)
        return reporter;
    
    [e, reporter] = tryCatch(require, `putout-formatter-${name}`);
    
    if (e)
        exit(e);
    
    return reporter;
}

