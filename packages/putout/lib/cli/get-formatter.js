'use strict';

const tryCatch = require('try-catch');
const stub = () => () => {};

module.exports = (name, exit) => {
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
};

