'use strict';

const {operator} = require('putout');
const {
    compare,
    getTemplateValues,
} = operator;

module.exports.report = () => 'Empty pattern';

module.exports.filter = (path) => {
    const {node} = path;
    
    if (!compare(node, 'const __array = __'))
        return true;
    
    const {__array} = getTemplateValues(node, 'const __array = __');
    const {elements} = __array;
    
    if (!elements.find(Boolean))
        return true;
    
    return false;
};

module.exports.replace = () => ({
    'const {} = __': '',
    'const __array = __': '',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

