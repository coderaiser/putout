'use strict';

const {operator} = require('putout');
const {traverse} = operator;

module.exports.report = () => `Useless async should be avoided`;

module.exports.fix = (path) => {
    path.node.async = false;
};

module.exports.include = () => [
    'async function __(__args) {}',
    'async (__args) => __body',
];

module.exports.filter = (path) => {
    let illegal = true;
    
    traverse(path, {
        'return __'(path) {
            illegal = false;
            path.stop();
        },
        
        'throw __'(path) {
            illegal = false;
            path.stop();
        },
        
        'await __'(path) {
            illegal = false;
            path.stop();
        },
        'for await (__ of __) __'(path) {
            illegal = false;
            path.stop();
        },
    });
    
    return illegal;
};

