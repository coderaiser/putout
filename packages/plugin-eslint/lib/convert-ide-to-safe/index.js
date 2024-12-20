'use strict';

const {operator} = require('putout');
const {getExtends} = require('../get.js');

const {__json} = operator;

module.exports.report = () => 'Use "putout/safe" instead of "putout/ide"';

module.exports.match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        
        for (const {value} of elements) {
            if (value.includes('putout/ide'))
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('putout/ide'))
                element.value = 'plugin:putout/safe';
        }
        
        return path;
    },
});
