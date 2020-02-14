'use strict';

module.exports = () => {
    const bin = require('../../help.json');
    const usage = 'Usage: putout [options] [path]';
    const result = [
        usage,
        'Options',
    ];
    
    for (const name of Object.keys(bin)) {
        result.push(`   ${name} ${bin[name]}`);
    }
    
    return result.join('\n');
};

