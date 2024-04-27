'use strict';

const {operator} = require('putout');
const {isBuiltin} = require('module');
const {setLiteralValue} = operator;

module.exports.report = ({value}) => {
    return `Use 'node:${value}' instead of '${value}'`;
};

module.exports.fix = ({path, value}) => {
    const {source} = path.node;
    
    setLiteralValue(source, `node:${value}`);
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        
        if (value.startsWith('node:'))
            return;
        
        if (!isBuiltin(value))
            return;
        
        push({
            path,
            value,
        });
    },
});
