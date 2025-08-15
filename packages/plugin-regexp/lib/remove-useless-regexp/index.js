import {
    template,
    types,
    operator,
} from 'putout';
import * as regexp from './regexp.js';

const {
    replaceWith,
    transformRegExp,
} = operator;

const {stringLiteral} = types;

const cut = (a) => a.slice(START, END);
const wrap = (a) => `/${a}/`;
const START = 1;
const END = -1;

export const report = () => `Remove useless RegExp, use strict equal operator instead`;

const build = template(`A === B`);

export const fix = ({path, to, arg}) => {
    replaceWith(path, build({
        A: arg,
        B: stringLiteral(to),
    }));
};

export const traverse = ({push}) => ({
    '/__a/.test(__b)'(path) {
        const regExpNode = path.node.callee.object;
        const {raw} = regExpNode.extra;
        const str = cut(raw);
        const [first] = str;
        const last = str.at(-1);
        
        if (first !== '^' || last !== '$')
            return false;
        
        const [arg] = path.node.arguments;
        const to = cut(str);
        const [, places] = transformRegExp(wrap(to), regexp);
        
        if (!places.length)
            return;
        
        push({
            path,
            arg,
            to,
        });
    },
});
