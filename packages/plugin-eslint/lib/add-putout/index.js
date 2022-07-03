'use strict';

const {types} = require('putout');
const {
    getExtends,
    getPlugins,
    isExtends,
    isPlugins,
} = require('../get');

const {StringLiteral} = types;

module.exports.report = () => `Add 'putout' to 'plugins' and 'extends'`;

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        if (!isExtends(__a) || !isPlugins(__a))
            return false;
        
        for (const {value} of getPlugins(__a)) {
            if (value === 'putout')
                return false;
        }
        
        return true;
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        getExtends(__a).push(StringLiteral('putout:plugin/safe+align'));
        getPlugins(__a).push(StringLiteral('putout'));
        
        return path;
    },
});

