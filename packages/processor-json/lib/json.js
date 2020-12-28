'use strict';

const prefix = '__putout_processor_json(';
const sufix = ');';

module.exports.files = [
    '*.json',
];

module.exports.preProcess = (rawSource) => {
    const source = `${prefix}${rawSource}${sufix}`;
    return [{
        startLine: 0,
        source,
    }];
};

module.exports.postProcess = (rawSource, list) => {
    const [source] = list;
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    
    const result = stripSpaces(sliced);
    
    return result;
};

function stripSpaces(source) {
    const lines = source.split('\n');
    const result = [];
    
    for (const line of lines) {
        if (line.length && /^\s+$/.test(line))
            continue;
        
        result.push(line);
    }
    
    return result.join('\n');
}

