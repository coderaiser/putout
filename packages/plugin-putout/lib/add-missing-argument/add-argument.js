'use strict';

const {
    operator,
    types,
    template,
} = require('putout');

const {
    Identifier,
    isExpressionStatement,
    ObjectPattern,
    ObjectProperty,
    isObjectExpression,
} = types;

const {compare} = operator;
const {entries} = Object;

const report = ({path, name}) => `Argument "${name}" is missing`;

module.exports.addArgument = (args) => ({
    report,
    fix: fix(args),
    traverse: traverse(args),
});

const fix = (args) => ({name, declaration, path}) => {
    let node = template.ast.fresh(declaration)
    
    if (isBlockStatement(node))
        node = ObjectPattern([
            ObjectProperty(node.body[0].expression),
        ]);
    
    path.scope.block.params = [
        node,
    ];
};

const traverse = (args) => ({push}) => ({
    ReferencedIdentifier(path) {
        for (const [name, [declaration, pattern]] of entries(args)) {
            if (path.node.name !== 'comparePlaces')
                return;
            
            if (path.scope.hasBinding('comparePlaces'))
                return;
            
            if (!compare(path.scope.path.parentPath, pattern))
                return false;
            
            push({name, declaration, path});
        }
    },
});

