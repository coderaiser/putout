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
    isObjectPattern,
    isIdentifier,
    isLabeledStatement,
} = types;

const {entries} = Object;

const COMPUTED = true;
const SHORTHAND = true;

const report = ({name}) => `Argument "${name}" is missing`;

const maybeObjectPattern = (a) => a || ObjectPattern([]);

module.exports.addArgument = (args) => ({
    report,
    fix,
    traverse: traverse(args),
});

const fix = ({declaration, path}) => {
    const declarationNode = template.ast.fresh(declaration);
    
    if (isBlockStatement(declarationNode)) {
        const prop = createProperty(declarationNode.body[0]);
        
        const {params} = path.scope.block;
        const node = maybeObjectPattern(params[0]);
        
        node.properties.push(prop);
        params[0] = node;
        
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
            for (const [name, [declaration, pattern]] of entries(allArgs)) {
                if (path.node.name !== name)
                    continue;
                
                if (path.scope.hasBinding(name))
                    continue;
                
                if (!isFunction(path.scope.block))
                    continue;
                
                const {params} = path.scope.block;
                
                if (params.length && has(name, params[0]))
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
    };
};

function has(name, node) {
    if (!isObjectPattern(node))
        return false;
    
    for (const {key, value} of node.properties) {
        if (isIdentifier(key, {name}) || isIdentifier(value, {name}))
            return true;
    }
    
    return false;
}

function createProperty(node) {
    if (!isLabeledStatement(node)) {
        const {expression} = node;
        return ObjectProperty(expression, expression, !COMPUTED, SHORTHAND);
    }
    
    const {label, body} = node;
    
    return ObjectProperty(label, body.expression, !COMPUTED, SHORTHAND);
}

