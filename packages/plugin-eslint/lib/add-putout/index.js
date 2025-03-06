'use strict';

const {types, operator} = require('putout');
const {
    getExtends,
    getPlugins,
    isExtends,
    isPlugins,
} = require('../get.js');

const {__json} = operator;
const {stringLiteral} = types;

module.exports.report = () => `Add 'putout' to 'plugins' and 'extends'`;

module.exports.match = () => ({
    [__json]: ({__object}) => {
        if (!isExtends(__object) || !isPlugins(__object))
            return false;
        
        for (const {value} of getPlugins(__object)) {
            if (value === 'putout')
                return false;
        }
        
        return true;
    },
});

module.exports.replace = () => ({
    [__json]: ({__object}, path) => {
        getExtends(__object).push(stringLiteral('putout:plugin/safe+align'));
        getPlugins(__object).push(stringLiteral('putout'));
        
        return path;
    },
});
