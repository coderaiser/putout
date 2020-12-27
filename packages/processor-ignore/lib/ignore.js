'use strict';

const {stringify} = JSON;
const rmLast = (a) => !/\n$/.test(a) ? a : a.slice(0, -1);

const prefix = '__putout_processor_ignore(';
const sufix = ');';
const parse = (a) => {
    const fn = Function(`return ${a}`);
    return fn();
};

module.exports.files = [
    '*ignore',
    '*rc',
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

function convertToArray(str) {
    const lines = rmLast(str).split('\n');
    return stringify(lines);
}

