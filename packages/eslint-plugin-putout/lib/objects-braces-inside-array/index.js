import {types} from 'putout';

const {isObjectExpression} = types;

export const category = 'destructuring';
export const report = () => 'Keep braces on the same line with brackets';

export const include = () => [
    'ArrayExpression',
];

const badStart = /^\[\n(\s+)?{/;
const badEndReg = /},?\n(\s+)?]/;
const badMiddle = /\},\n(\s+)?\{/;

export const filter = ({node, text}) => {
    const {elements} = node;
    
    for (const element of elements) {
        if (!isObjectExpression(element))
            return false;
    }
    
    const isStart = badStart.test(text);
    const isEnd = badEndReg.test(text);
    const isBadMiddle = badMiddle.test(text);
    
    return isStart || isEnd || isBadMiddle;
};

export const fix = ({text}) => {
    return text
        .replace('[\n', '[')
        .replace(/\[\s+{/, '[{')
        .replace('\n]', ']')
        .replace(/},\n(\s+)?{/g, '}, {')
        .replace(badEndReg, '}]');
};
