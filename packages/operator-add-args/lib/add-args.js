import {compareAny} from '@putout/compare';
import {template} from '@putout/engine-parser';
import {types} from '@putout/babel';

const isString = (a) => typeof a === 'string';
const {isArray} = Array;

const {
    isBlockStatement,
    isFunction,
    isLabeledStatement,
    isObjectPattern,
    isCallExpression,
    isSequenceExpression,
    objectPattern,
    objectProperty,
} = types;

const {entries} = Object;

const COMPUTED = true;
const SHORTHAND = true;

const isCallOrStatement = (path) => path.isCallExpression() || path.isStatement();

const isCall = (path) => {
    return isCallExpression(path.find(isCallOrStatement));
};

const report = ({name}) => `Argument '${name}' is missing`;

export const addArgs = (args) => ({
    report,
    fix,
    traverse: traverse(args),
});

const fix = ({declaration, path, pattern, params, index}) => {
    const declarationNode = template.ast.fresh(declaration);
    
    if (isSequenceExpression(declarationNode)) {
        const {expressions} = declarationNode;
        const {block} = path.scope;
        const {params} = block;
        
        block.params.push(...expressions.slice(params.length));
        return;
    }
    
    if (isBlockStatement(declarationNode)) {
        const prop = createProperty(declarationNode.body[0]);
        pattern.properties.push(prop);
        
        if (!isObjectPattern(params[index]))
            return params.push(pattern);
        
        return;
    }
    
    path.scope.block.params = [
        declarationNode,
    ];
};

const traverse = (args) => ({push, options}) => {
    const allArgs = {
        ...options.args,
        ...args,
    };
    
    return {
        ReferencedIdentifier(path) {
            for (const [name, config] of entries(allArgs)) {
                const [declaration, type, include, exclude] = parseConfig(config);
                
                if (path.node.name !== name)
                    continue;
                
                if (path.scope.hasBinding(name))
                    continue;
                
                if (type === 'call' && !isCall(path))
                    continue;
                
                const fnPath = path.find(isFunction);
                
                if (!fnPath)
                    continue;
                
                const {block} = fnPath.scope;
                
                if (!compareAny(path.scope.path, include))
                    continue;
                
                if (compareAny(path.scope.path, exclude))
                    continue;
                
                const {params} = block;
                const [index, lastParam] = getObjectPattern(params);
                
                if (isObjectPattern(lastParam)) {
                    push({
                        name,
                        index,
                        declaration,
                        path,
                        params,
                        pattern: lastParam,
                    });
                    return;
                }
                
                if (params.length >= 3)
                    return;
                
                push({
                    name,
                    index,
                    declaration,
                    path,
                    params,
                    pattern: objectPattern([]),
                });
            }
        },
    };
};

function createProperty(node) {
    if (!isLabeledStatement(node)) {
        const {expression} = node;
        return objectProperty(expression, expression, !COMPUTED, SHORTHAND);
    }
    
    const {label, body} = node;
    
    return objectProperty(label, body.expression, !COMPUTED, SHORTHAND);
}

function getObjectPattern(params) {
    for (const [i, param] of params.entries()) {
        if (isObjectPattern(param))
            return [i, param];
    }
    
    return [
        -1,
        null,
    ];
}

const ALL_TYPES = '';

function parseConfig(config) {
    const [declaration, patternsInclude, patternsExclude] = config;
    
    if (isArray(patternsInclude) || isString(patternsInclude))
        return [
            declaration,
            ALL_TYPES,
            patternsInclude,
            patternsExclude,
        ];
    
    const {
        type = ALL_TYPES,
        include,
        exclude,
    } = patternsInclude;
    
    return [
        declaration,
        type,
        include,
        exclude,
    ];
}
