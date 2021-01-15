'use strict';

const regexpTree = require('regexp-tree');

module.exports.report = ({from, to}) => `Remove useless group from RegExp ${from}, use ${to}`;

module.exports.fix = ({path, to}) => {
    path.node.extra.raw = to;
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
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
            const {node} = path;
            
            if (node.expression.type === 'Disjunction')
                return;
            
            is = true;
            path.replace(node.expression);
        },
    });
    
    return [is, regexpTree.generate(ast)];
}

