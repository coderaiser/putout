'use strict';

const {operator} = require('putout');
const {isBuiltIn} = require('./is-built-in');
const {setLiteralValue} = operator;

module.exports.report = () => `Add 'node:' prefix`;

module.exports.fix = (path) => {
    const {source} = path.node;
    const {value} = source;
    
    setLiteralValue(source, `node:${value}`);
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        
        if (value.startsWith('node:'))
            return;
        
        if (!isBuiltIn(value))
            return;
        
        push(path);
    },
});
