'use strict';

const regexpTree = require('regexp-tree');

const {
    template,
    types,
    operator,
} = require('putout');

const {isAlternative, isChar} = require('../types');

const {replaceWith} = operator;
const {StringLiteral} = types;

module.exports.report = () => `Remove useless RegExp, use strict equal operator instead`;

const build = template(`A === B`);

module.exports.fix = ({path, to, arg}) => {
    replaceWith(path, build({
        A: arg,
        B: StringLiteral(to),
    }));
};

module.exports.traverse = ({push}) => ({
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
