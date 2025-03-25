import regexpTree from 'regexp-tree';
import {
    template,
    types,
    operator,
} from 'putout';
import {isAlternative, isChar} from '../types.js';

const {replaceWith} = operator;
const {stringLiteral} = types;

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
        const is = isOnlyChars(wrap(to));
        
        if (is)
            push({
                path,
                arg,
                to,
            });
    },
});

const not = (f) => (...a) => !f(...a);
const START = 1;
const END = -1;
const cut = (a) => a.slice(START, END);
const wrap = (a) => `/${a}/`;

function isOnlyChars(str) {
    const ast = regexpTree.parse(str);
    let is = false;
    
    regexpTree.traverse(ast, {
        RegExp({node}) {
            const {body} = node;
            
            if (isChar(body) && !body.value.includes('\\')) {
                is = true;
                return;
            }
            
            if (isAlternative(body)) {
                is = !body.expressions.filter(not(isChar)).length;
                return;
            }
        },
    });
    
    return is;
}
