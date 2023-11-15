'use strict';

const {operator} = require('putout');
const {__ignore, remove} = operator;
const getValue = ({value}) => value;

module.exports.report = () => 'remove node from .browserlist';

const LINE = 'maintained node versions';

module.exports.match = () => ({
    [__ignore]: ({__array}) => {
        const list = __array.elements.map(getValue);
        
        let isBrowser = false;
        
        for (const item of list) {
            if (/Firefox|Chrome|Safari/.test(item)) {
                isBrowser = true;
                break;
            }
        }
        
        if (!isBrowser)
            return false;
        
        return list.includes(LINE);
    },
});

module.exports.replace = () => ({
    [__ignore]: (vars, path) => {
        const elementsPath = path.get('arguments.0.elements');
        
        for (const elementPath of elementsPath) {
            if (elementPath.node.value === LINE) {
                remove(elementPath);
                break;
            }
        }
        
        return path;
    },
});
