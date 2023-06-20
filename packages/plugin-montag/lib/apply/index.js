'use strict';

const {types} = require('putout');
const {isStringLiteral} = types;

module.exports.report = () => `Apply 'montag' instead of [''].join()`;

module.exports.match = () => ({
    '__array.join("\\n")': ({__array}) => {
        const {elements} = __array;
        return elements.every(isStringLiteral);
    },
});

module.exports.replace = () => ({
    '__array.join("\\n")': ({__array}, path) => {
        const [value, aligner] = evaluate({
            __array,
        }, path);
        
        return `montag\`\n${value}\n${aligner}\``;
    },
});

const createAligner = (i) => Array(i + 1).join(' ');
const getValue = (a) => a.value;

function evaluate({__array}, path) {
    const str = __array
        .elements
        .map(getValue)
        .join('\n');
    
    const lines = str.split('\n');
    const column = getColumn(path);
    const aligned = [];
    const aligner = createAligner(column);
    
    for (const line of lines) {
        aligned.push(`${aligner}${line}`.replace(/\n/g, '\\n'));
    }
    
    const alignedStr = aligned
        .join('\n')
        .replace(/\`/g, '\\`');
    
    return [alignedStr, createAligner(column - 4)];
}

function getColumn(path) {
    const {column} = path.node.callee.object.elements[0].loc.start;
    
    return column;
}
