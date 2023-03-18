'use strict';

const {compareAny} = require('@putout/compare');
const {template} = require('@putout/engine-parser');

const {
    ObjectPattern,
    ObjectProperty,
    isBlockStatement,
    isFunction,
    isLabeledStatement,
    isObjectPattern,
} = require('@babel/types');

const {entries} = Object;

const COMPUTED = true;
const SHORTHAND = true;

const report = ({name}) => `Argument "${name}" is missing`;

module.exports.addArgs = (args) => ({
    report,
    fix,
    traverse: traverse(args),
});

const fix = ({declaration, path, pattern}) => {
    const declarationNode = template.ast.fresh(declaration);
    
    if (isBlockStatement(declarationNode)) {
        const prop = createProperty(declarationNode.body[0]);
        
        const {params} = path.scope.block;
        pattern.properties.push(prop);
        
        const n = params.length - 1;
        
        if (isObjectPattern(params[n]))
            params[n] = pattern;
        else
            params.push(pattern);
        
        return;
    }
    
    path.scope.block.params = [declarationNode];
};

const traverse = (args) => ({push, options}) => {
    const allArgs = {
        ...options.args,
        ...args,
    };
    
    return {
        ReferencedIdentifier(path) {
            const {parentPath} = path;
            
            for (const [name, [declaration, pattern]] of entries(allArgs)) {
                if (path.node.name !== name)
                    continue;
                
                if (!isCall(parentPath))
                    continue;
                
                if (path.scope.hasBinding(name))
                    continue;
                
                if (!isFunction(path.scope.block))
                    continue;
                
                if (!compareAny(path.scope.path.parentPath, pattern))
                    continue;
                
                const {params} = path.scope.block;
                const lastParam = params.at(-1);
                
                if (isObjectPattern(lastParam)) {
                    push({
                        name,
                        declaration,
                        path,
                        pattern: lastParam,
                    });
                    return;
                }
                
                push({
                    name,
                    declaration,
                    path,
                    pattern: ObjectPattern([]),
                });
            }
        },
    };
};

function createProperty(node) {
    if (!isLabeledStatement(node)) {
        const {expression} = node;
        return ObjectProperty(expression, expression, !COMPUTED, SHORTHAND);
    }
    
    const {label, body} = node;
    
    return ObjectProperty(label, body.expression, !COMPUTED, SHORTHAND);
}

function isCall(path) {
    return path.isCallExpression() || path.parentPath.isCallExpression();
}

