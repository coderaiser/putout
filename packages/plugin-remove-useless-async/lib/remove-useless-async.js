'use strict';

const {operator} = require('putout');
const {compare} = operator;

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
    
    path.traverse({
        ReturnStatement(path) {
            illegal = false;
            path.stop();
        },
        
        ThrowStatement(path) {
            illegal = false;
            path.stop();
        },
        
        AwaitExpression(path) {
            illegal = false;
            path.stop();
        },
        ForOfStatement(path) {
            if (!compare(path, 'for await (__ of __) __'))
                return;
            
            illegal = false;
            path.stop();
        },
    });
    
    return illegal;
};

