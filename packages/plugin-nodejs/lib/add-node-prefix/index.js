'use strict';

const {isBuiltin} = require('node:module');
const {types, operator} = require('putout');

const {
    setLiteralValue,
    getTemplateValues,
} = operator;

const {isCallExpression} = types;

const REQUIRE = 'require("__a")';

module.exports.report = ({value}) => {
    return `Use 'node:${value}' instead of '${value}'`;
};

module.exports.fix = ({path, value}) => {
    if (isCallExpression(path)) {
        const arg = path.get('arguments.0');
        setLiteralValue(arg, `node:${value}`);
        
        return;
    }
    
    const {source} = path.node;
    setLiteralValue(source, `node:${value}`);
};

module.exports.traverse = ({push}) => ({
    [REQUIRE](path) {
        const {__a} = getTemplateValues(path, REQUIRE);
        const {value} = __a;
        
        if (check(value))
            push({
                path,
                value,
            });
    },
    'ImportDeclaration|ImportExpression'(path) {
        const {value} = path.node.source;
        
        if (check(value))
            push({
                path,
                value,
            });
    },
});

function check(value) {
    if (!value)
        return false;
    
    if (value.startsWith('node:'))
        return false;
    
    return isBuiltin(value);
}
