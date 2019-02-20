'use strict';

const {
    isStringLiteral,
    
    arrowFunctionExpression,
    stringLiteral,
    identifier,
    callExpression,
    arrayExpression,
} = require('putout').types;

module.exports.report = ({name}) => {
    return `"series" should be called instead of "redrun" in script: "${name}"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ArrowFunctionExpression(path) {
            const {body} = path.node;
            if (!isStringLiteral(body))
                return;
            
            const {value} = body;
            if (value.indexOf('redrun'))
                return;
            
            push({
                path,
                name: path.parent.key.value,
                scripts: value.split(' ').slice(1),
            });
        },
    });
};

module.exports.fix = ({path, scripts}) => {
    const strs = [];
    for (const script of scripts) {
        strs.push(stringLiteral(script));
    }
    
    path.replaceWith(callExpression(identifier('series'), [
        arrayExpression(strs),
    ]));
    
    path.replaceWith(arrowFunctionExpression([], path.node));
};

