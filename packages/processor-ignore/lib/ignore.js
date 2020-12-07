'use strict';

const rmLast = (a) => a.slice(0, -1);
const addNewLine = (a) => /\n$/.test(a) ? a : `${a}\n`;

const prefix = '__putout_processor_ignore(';
const sufix = ');';
const parse = (a) => {
    const fn = Function(`return ${a}`);
    return fn();
};

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

function convertToArray(line) {
    const lines = addNewLine(line).split('\n');
    const result = '"' + rmLast(lines.join('", "'));
    
    return `[${result}]`;
}

