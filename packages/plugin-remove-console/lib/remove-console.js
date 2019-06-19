'use strict';

const {
    isIdentifier,
    isLiteral,
    isMemberExpression,
} = require('putout').types;

module.exports.report = () => 'Unexpected "console" call';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        CallExpression(path) {
            const {callee} = path.node;
            
            if (!isMemberExpression(callee))
                return;
            
            const {object, property} = callee;
            const isObject = isIdentifier(object, {name: 'console'});
            
            if (!isObject)
                return;
            
            const isPropertyIdentifier = isOneOfIdentifiers(property, [
                'log',
                'error',
                'warn',
                'time',
                'timeEnd',
            ]);
            
            const isPropertyLiteral = isOneOfLiterals(property, [
                'log',
                'error',
                'warn',
                'time',
                'timeEnd',
            ]);
            
            if (!isPropertyIdentifier && !isPropertyLiteral)
                return;
            
            if (path.scope.hasBinding('console'))
                return;
            
            push(path);
        },
    };
};

function isOneOfIdentifiers(node, array) {
    for (const name of array)
        if (isIdentifier(node, {name}))
            return true;
    
    return false;
}

function isOneOfLiterals(node, array) {
    for (const value of array)
        if (isLiteral(node, {value}))
            return true;
    
    return false;
}

