'use strict';

const {
    isStringLiteral,
    stringLiteral,
    identifier,
    callExpression,
    arrayExpression,
} = require('putout').types;

module.exports.report = ({name}) => {
    return `"series" should be called in script: "${name}"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ArrowFunctionExpression(path) {
            const {body} = path.node;
            if (!isStringLiteral(body))
                return;
            
            const {value} = body;
            if (!/^(redrun|npm run)/.test(value))
                return;
            
            push({
                path,
                value,
                name: path.parent.key.value,
            });
        },
    });
};

module.exports.fix = ({path, value}) => {
    const [line, arg] = value.split(' -- ');
    const scripts = getScripts(line);
    
    const strs = [];
    for (const script of scripts) {
        strs.push(stringLiteral(script));
    }
    
    const seriesArgs = getSeriesArgs(strs, arg);
    
    path.node.body = callExpression(identifier('series'), seriesArgs);
};

function getSeriesArgs(strs, arg) {
    if (!arg)
        return [
            arrayExpression(strs),
        ];
    
    return [
        arrayExpression(strs),
        stringLiteral(arg),
    ];
}

function getScripts(line) {
    const scripts = line.split(' ');
    
    if (!line.indexOf('redrun'))
        return scripts.slice(1);
    
    return scripts.slice(2);
}

