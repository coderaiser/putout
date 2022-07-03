'use strict';

const {getExtends} = require('../get');

module.exports.report = () => 'Use "putout/safe" instead of "putout/ide"';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const elements = getExtends(__a);
        
        for (const {value} of elements) {
            if (value.includes('putout/ide'))
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const elements = getExtends(__a);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('putout/ide'))
                element.value = 'plugin:putout/safe';
        }
        
        return path;
    },
});

