'use strict';

const errorStackParser = require('error-stack-parser');

module.exports = (e) => {
    if (!e)
        return [];
    
    const {
        line,
        column,
    } = getPosition(e);
    
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

function cutBrackets(a) {
    const index = a.lastIndexOf('(');
    
    if (!~index)
        return a;
    
    return a.slice(0, index);
}

function getPosition(e) {
    if (e.loc)
        return e.loc;
    
    const [stack] = errorStackParser.parse(e);
    
    return {
        line: stack.lineNumber,
        column: stack.columnNumber,
    };
}

