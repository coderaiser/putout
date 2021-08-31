'use strict';

const regexpTree = require('regexp-tree');
const {compare} = require('putout').operator;
const {isDisjunction} = require('../types');

module.exports.report = ({from, to}) => `Remove useless group from RegExp ${from}, use ${to}`;

module.exports.exclude = () => [
    '__.split(__)',
    '__.exec(__)',
    '__.replace(__, __)',
    '__.replaceAll(__, __)',
    'const __a = /__b/',
];

module.exports.fix = ({path, to}) => {
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
            if (path.parent.type !== 'RegExp')
                return;
            
            const {node} = path;
            
            if (node.name)
                return;
            
            if (!node.expression)
                return;
            
            if (isDisjunction(node.expression))
                return;
            
            is = true;
            path.replace(node.expression);
        },
    });
    
    return [is, regexpTree.generate(ast)];
}

function includes(path) {
    const {parentPath} = path;
    
    if (compare(parentPath, '__.match(/__a/)'))
        return true;
    
    if (compare(parentPath.parentPath, '/__a/.test(__b)')) {
        return true;
    }
    
    if (compare(parentPath, '__.search(/__a/)'))
        return true;
    
    return false;
}
