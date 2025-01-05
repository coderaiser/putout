'use strict';

module.exports = (e, type = 'parser') => {
    const {line, column} = e.loc || {
        line: 1,
        column: 1,
    };
    
    const rule = e.rule ? `${e.rule} (parser)` : type;
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

const cutBrackets = (a) => a.replace(/\s\(\d:\d+\)/, '');
