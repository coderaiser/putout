'use strict';

const {operator} = require('putout');
const {addArgs} = operator;

const parents = [
    '__ = __',
    'const __ = __',
    'module.exports.__a = (path, __object) => __body',
    'module.exports.__a = (path) => __body',
    'function __(path) {}',
    'function __(path, __object) {}',
];

module.exports = addArgs({
    path: ['path', 'module.exports.__a = () => __body'],
    maybe: ['{maybe}', parents],
    write: ['{write}', parents],
    print: ['{print}', parents],
    indent: ['{indent}', parents],
    compute: ['{compute}', parents],
    traverse: ['{traverse}', parents],
    store: ['{store}', parents],
});
