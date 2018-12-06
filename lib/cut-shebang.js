'use strict';

module.exports = (source) => {
    if (source.indexOf('#'))
        return [source, ''];
    
    const lines = source.split('\n');
    const shebang = `${lines[0]}\n`;
    const result = lines.slice(1).join('\n');
    
    return [result, shebang];
};

