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
    '__array.join("\\n")': (vars, path) => {
        const [value, aligner] = evaluate(path);
        
        return `montag\`\n${value}\n${aligner}\``;
    },
});

const createAligner = (i) => Array(i + 1).join(' ');

function evaluate(path) {
    const fn = Function(`return ${path}`);
    const str = fn();
    const lines = str.split('\n');
    const column = getColumn(path);
    const aligned = [];
    const aligner = createAligner(column);
    for (const line of lines) {
        aligned.push(`${aligner}${line}`);
    }
    
    return [aligned.join('\n'), createAligner(column - 4)];
}

function getColumn(path) {
    const {column} = path.node.callee.object.elements[0].loc.start;
    
    return column;
}

