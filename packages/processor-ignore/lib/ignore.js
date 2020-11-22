'use strict';

const {parse} = JSON;
const convertToArray = (a) => `["${a.split('\n').join('","').slice(0, -1)}]`;

const prefix = '__putout_processor_ignore(';
const sufix = ');';

module.exports.files = [
    '*ignore',
];

module.exports.preProcess = (rawSource) => {
    const array = convertToArray(rawSource);
    const source = `${prefix}${array}${sufix}`;
    
    return [{
        startLine: 0,
        source,
        extension: 'json',
    }];
};

module.exports.postProcess = (rawSource, list) => {
    const [source] = list;
    const length = source.length - sufix.length;
    const str = source.slice(prefix.length, length);
    const array = parse(str);
    
    return array.join('\n') + '\n';
};

