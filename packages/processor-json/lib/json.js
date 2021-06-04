'use strict';

const removeBlankLines = require('remove-blank-lines');

const prefix = '__putout_processor_json(';
const sufix = ');';

module.exports.files = [
    '*.json',
];

const toJS = (source) => `${prefix}${source}${sufix}`;
const fromJS = (source) => {
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    
    return removeBlankLines(sliced);
};

module.exports.toJS = toJS;
module.exports.fromJS = fromJS;

module.exports.branch = (rawSource) => {
    const source = toJS(rawSource);
    return [{
        startLine: 0,
        source,
    }];
};

module.exports.merge = (rawSource, list) => {
    const [source] = list;
    return fromJS(source);
};

