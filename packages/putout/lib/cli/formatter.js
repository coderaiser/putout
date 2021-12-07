'use strict';

const {createSimport} = require('simport');
const tryToCatch = require('try-to-catch');

const {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} = require('./exit-codes');

const simport = createSimport(__filename);
const stub = () => () => {};

const {isArray} = Array;
const {assign} = Object;
const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports.getFormatter = async (formatter, exit) => {
    const [name, formatterOptions] = maybeArray(formatter);
    
    return [
        await getReporter(name, exit),
        formatterOptions,
    ];
};

module.exports.getReporter = getReporter;
async function getReporter(name, exit) {
    if (name === 'none')
        return stub();
    
    const [error, reporter] = await loadFormatter([
        `@putout/formatter-${name}`,
        `putout-formatter-${name}`,
    ]);
    
    if (reporter)
        return reporter;
    
    if (error.code === 'ERR_MODULE_NOT_FOUND')
        return exit(NO_FORMATTER, error);
    
    exit(CANNOT_LOAD_FORMATTER, error);
}

async function loadFormatter(names) {
    let e;
    let reporter;
    
    for (const name of names) {
        [e, reporter] = await tryToCatch(simport, name);
        
        if (!e)
            return [null, reporter];
        
        if (e.code === 'ERR_MODULE_NOT_FOUND')
            continue;
        
        assign(e, {
            message: `${name}: ${e.message}`,
        });
        
        return [e];
    }
    
    assign(e, {
        message: e.message.replace(/\simported.*/, ''),
    });
    
    return [e];
}
