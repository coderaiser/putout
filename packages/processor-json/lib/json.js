'use strict';

const removeBlankLines = require('remove-blank-lines');

const prefix = '__putout_processor_json(';
const sufix = ');';

module.exports.files = [
    '*.json',
];

module.exports.branch = (rawSource) => {
    const source = `${prefix}${rawSource}${sufix}`;
    return [{
        startLine: 0,
        source,
    }];
};

module.exports.merge = (rawSource, list) => {
    const [source] = list;
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    const result = removeBlankLines(sliced);
    
    return result;
};

