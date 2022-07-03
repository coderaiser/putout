'use strict';

const {getExtends} = require('../get');

module.exports.report = () => '"putout" should be in the end of the "extends" list';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const elements = getExtends(__a);
        
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
    '__putout_processor_json(__a)': ({__a}, path) => {
        const elements = getExtends(__a);
        
        const first = elements.shift();
        elements.push(first);
        
        return path;
    },
});

