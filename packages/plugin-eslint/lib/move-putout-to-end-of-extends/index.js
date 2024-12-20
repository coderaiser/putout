'use strict';

const {operator} = require('putout');
const {getExtends} = require('../get.js');

const {__json} = operator;

module.exports.report = () => '"putout" should be in the end of the "extends" list';

module.exports.match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        
        if (!elements.length)
            return false;
        
        const [first] = elements;
        const {value} = first;
        
        const includesPutout = value.includes('putout');
        
        if (elements.length === 1 && includesPutout)
            return false;
        
        return includesPutout;
    },
});

module.exports.replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        
        const first = elements.shift();
        elements.push(first);
        
        return path;
    },
});
