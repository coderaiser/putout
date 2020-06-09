'use strict';

const name = '[transform]';
const returns = (a) => () => a;

module.exports = (line) => {
    if (!line)
        return [];
    
    const [from, to] = line.split('->');
    const report = returns(line);
    const replace = returns({
        [from]: to,
    });
    
    const plugin = [name, {
        report,
        replace,
    }];
    
    return [plugin];
};

