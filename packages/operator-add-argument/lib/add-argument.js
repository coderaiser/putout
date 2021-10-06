'use strict';

const {compare} = require('@putout/compare');
const {
    types,
    template,
} = require('putout');

const {
    ObjectPattern,
    ObjectProperty,
    isBlockStatement,
    isFunction,
} = types;

const {entries} = Object;

const report = ({name}) => `Argument "${name}" is missing`;

module.exports.addArgument = (args) => ({
    report,
    fix,
    traverse: traverse(args),
});

const fix = ({declaration, path}) => {
    const declarationNode = template.ast.fresh(declaration);
    
    if (isBlockStatement(declarationNode)) {
        const {expression} = declarationNode.body[0];
        const prop = ObjectProperty(expression, expression);
        const node = ObjectPattern([prop]);
        
        path.scope.block.params = [node];
        return;
    }
    
    path.scope.block.params = [declarationNode];
};

const traverse = (args) => ({push}) => ({
    ReferencedIdentifier(path) {
        for (const [name, [declaration, pattern]] of entries(args)) {
            if (path.node.name !== name)
                continue;
            
            if (path.scope.hasBinding(name))
                continue;
            
            if (!isFunction(path.scope.block))
                continue;
            
            if (path.scope.block.params.length)
                continue;
            
            if (!compare(path.scope.path.parentPath, pattern))
                continue;
            
            push({
                name,
                declaration,
                path,
            });
        }
    },
});

