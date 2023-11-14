'use strict';

const {operator} = require('putout');
const {isBuiltin} = require('module');
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
        
        if (!isBuiltin(value))
            return;
        
        push(path);
    },
});
