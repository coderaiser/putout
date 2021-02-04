'use strict';

const {files} = require('@putout/processor-javascript');

const natural = (a) => ++a;
const plugins = [{
    rule: 'arrow-declaration',
    message: '"function() => {" should be changed to "function() {"',
    test: /function(\s+)?([\dA-Za-z]+)?\(.*\)(\s+?)?=>(\s+)?{/g,
    fix: [/\s+=>\s+{/g, ' {'],
}, {
    rule: 'import-assignment',
    message: 'import should be used without assignment',
    test: /import\s+[A-Za-z]+\s+=\s+from\s[\'a-z]+/g,
    fix: [/\s+=\s+from\s+/g, ' from '],
}];

module.exports.files = files;

module.exports.process = (source, {fix}) => {
    let output = source;
    let places = [];
    
    for (const plugin of plugins) {
        const {rule, message} = plugin;
        const reg = plugin.test;
        const [from, to] = plugin.fix;
        
        if (reg.test(source)) {
            const {lastIndex} = reg;
            const position = getPosition(source, lastIndex);
            
            places.push({
                rule: `${rule} (typos)`,
                message,
                position
            });
            
            output = output.replace(from, to);
        }
        
        reg.lastIndex = 0;
    }
    
    if (fix)
        return [output, []];
    
    return [source, places];
};

function getPosition(text, index) {
    let line = 0;
    let lastLineIndex = 0;
    let i = 0;
    
    while (i <= index) {
        if (text[i] === '\n') {
            lastLineIndex = i;
            ++line;
        }
        
        ++i;
    }
    
    if (!line)
        line = 1;
    
    const column = natural(index - lastLineIndex);
    
    return {
        line,
        column,
    };
}

