'use strict';

const {
    getExtends,
    getPlugins,
} = require('../get');
const {assign} = Object;

module.exports.report = () => `Use 'n' instead of 'node'`;

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const elements = getExtends(__a);
        const plugins = getPlugins(__a);
        
        for (const {value} of elements) {
            if (value.includes('node/recommended'))
                return true;
        }
        
        for (const {value} of plugins) {
            if (value === 'node')
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const elements = getExtends(__a);
        const plugins = getPlugins(__a);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('node/recommended'))
                assign(element, {
                    value: 'plugin:n/recommended',
                    raw: element.raw.replace('node', 'n'),
                });
        }
        
        for (const element of plugins) {
            const {value} = element;
            
            if (value === 'node')
                assign(element, {
                    value: 'n',
                    raw: element.raw.replace('node', 'n'),
                });
        }
        
        return path;
    },
});
