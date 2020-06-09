'use strict';

const parser = require('error-stack-parser');

module.exports.parseError = (e, {debug}) => {
    if (!e)
        return [];
    
    const {line, column} = e.loc || (debug ? getPosition(e) : {
        line: 1,
        column: 1,
    });
    const rule = `crash/${e.rule || 'parser'}`;
    const message = cutBrackets(e.message);
    
    return [{
        rule,
        message,
        position: {
            line,
            column,
        },
    }];
};

module.exports.parseName = (e) => {
    if (!e)
        return '';
    
    const [stack] = parser.parse(e);
    
    return stack.fileName;
};

function cutBrackets(a) {
    const index = a.lastIndexOf('(');
    
    if (!~index)
        return a;
    
    return a.slice(0, index);
}

function getPosition(e) {
    const [stack] = parser.parse(e);
    const {
        lineNumber,
        columnNumber,
    } = stack;
    
    return {
        line: lineNumber,
        column: columnNumber,
    };
}

