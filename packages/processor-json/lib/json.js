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
    
    return source.slice(prefix.length, length);
};

