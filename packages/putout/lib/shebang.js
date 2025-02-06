'use strict';

module.exports.mergeShebang = (shebang, source) => {
    if (!shebang)
        return source;
    
    return `${shebang}\n${source}`;
};

module.exports.cutShebang = (source) => {
    if (source.indexOf('#'))
        return [source, ''];
    
    const lines = source.split('\n');
    
    const result = lines
        .slice(1)
        .join('\n');
    
    const [shebang] = lines;
    
    return [
        result,
        `${shebang}\n`,
    ];
};
