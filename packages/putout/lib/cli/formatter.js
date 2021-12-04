'use strict';

const {createSimport} = require('simport');
const tryToCatch = require('try-to-catch');

const {NO_FORMATTER} = require('./exit-codes');

const simport = createSimport(__filename);
const stub = () => () => {};

const {isArray} = Array;
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
    let e;
    let reporter;
    
    if (name === 'none') {
        return stub();
    }
    
    [e, reporter] = await tryToCatch(simport, `@putout/formatter-${name}`);
    
    if (!e)
        return reporter;
    
    [e, reporter] = await tryToCatch(simport, `putout-formatter-${name}`);
    
    if (!e)
        return reporter;
    
    exit(NO_FORMATTER, e);
}

