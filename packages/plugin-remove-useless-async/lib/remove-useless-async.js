'use strict';

const {operator} = require('putout');
const {contains} = operator;

module.exports.report = () => `Useless async should be avoided`;

module.exports.fix = (path) => {
    path.node.async = false;
};

module.exports.include = () => [
    'async function __(__args) {}',
    'async (__args) => __body',
];

module.exports.filter = (path) => {
    const {body} = path.node.body;
    
    if (!body.length)
        return false;
    
    const is = contains(path, [
        'return __',
        'throw __',
        'await __',
        'for await (__ of __) __',
    ]);
    
    return !is;
};

