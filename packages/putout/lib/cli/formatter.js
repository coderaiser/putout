'use strict';

const tryToCatch = require('try-to-catch');
const {createAsyncLoader} = require('@putout/engine-loader');

const {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} = require('./exit-codes');

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports.getFormatter = async (formatterOptional, exit) => {
    const [formatterName, formatterOptions] = maybeArray(formatterOptional);
    const loadFormatter = createAsyncLoader('formatter');
    
    const [error, formatter] = await tryToCatch(loadFormatter, formatterName, exit);
    
    if (formatter)
        return [formatter, formatterOptions];
    
    if (error.code === 'ERR_MODULE_NOT_FOUND')
        return exit(NO_FORMATTER, error);
    
    exit(CANNOT_LOAD_FORMATTER, error);
};

