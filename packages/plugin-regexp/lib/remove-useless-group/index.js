'use strict';

const regexpTree = require('regexp-tree');
const {compare} = require('putout').operator;
const {
    isDisjunction,
    isParentDisjunction,
} = require('../types');

module.exports.report = ({from, to}) => `Remove useless group from RegExp ${from}, use ${to}`;

module.exports.exclude = () => [
    '__.match(__)',
    '__.split(__)',
    '__.exec(__)',
    '__.replace(__, __)',
    '__.replaceAll(__, __)',
    'const __a = /__b/',
];

module.exports.fix = ({path, to}) => {
    const [, pattern] = to.split('/');
    
    path.node.pattern = pattern;
    path.node.raw = to;
    path.node.extra.raw = to;
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
        if (!includes(path))
            return;
        
        const from = path.node.extra.raw;
        const [is, to] = removeUselessGroup(from);
        
        if (is)
            push({
                path,
                from,
                to,
            });
    },
});

function removeUselessGroup(str) {
    const ast = regexpTree.parse(str);
    let is = false;
    
    regexpTree.traverse(ast, {
        Group(path) {
            const {type} = path.parent;
            
            if (!/RegExp|Alternative/.test(type))
                return;
            
            const nextNode = getNextSibling(path);
            
            if (nextNode?.type === 'Repetition')
                return;
            
            const {node} = path;
            
            if (node.name)
                return;
            
            if (!node.expression)
                return;
            
            if (isParentDisjunction(path))
                return;
            
            if (isDisjunction(node.expression))
                return;
            
            is = true;
            path.replace(node.expression);
        },
    });
    
    return [is, regexpTree.generate(ast)];
}

function includes({parentPath}) {
    if (compare(parentPath.parentPath, '/__a/.test(__b)'))
        return true;
    
    return compare(parentPath, '__.search(/__a/)');
}

function getNextSibling(path) {
    let found = false;
    const {expressions = []} = path.parent;
    
    for (const current of expressions) {
        if (found)
            return current;
        
        if (current === path.node)
            found = true;
    }
    
    return null;
}
