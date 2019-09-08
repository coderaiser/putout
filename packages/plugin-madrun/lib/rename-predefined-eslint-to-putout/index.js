'use strict';

const {types: t} = require('putout');

module.exports.report = () => `"putout" should be used instead of "eslint", when predefined`;

module.exports.fix = ({eslint}) => {
    eslint.scope.rename('eslint', 'putout');
};

module.exports.traverse = ({push}) => {
    return {
        VariableDeclarator(path) {
            if (!isPredefined(path.get('init')))
                return;
            
            const idPath = path.get('id');
            
            if (!idPath.isObjectPattern())
                return;
            
            const properties = idPath.get('properties');
            const {eslint, putout} = getPredefined(properties);
            
            if (!eslint || putout)
                return;
            
            if (isRulesdir(eslint.scope.bindings))
                return;
            
            push({
                eslint,
                path,
            });
        },
    };
};

function isPredefined(path) {
    return path.isIdentifier({
        name: 'predefined',
    });
}

function getPredefined(properties) {
    const result = {};
    
    for (const property of properties) {
        const key = property.get('key');
        
        if (key.isIdentifier({name: 'eslint'}))
            result.eslint = key;
        
        if (key.isIdentifier({name: 'putout'}))
            result.putout = key;
    }
    
    return result;
}

function isRulesdir({eslint}) {
    if (!eslint)
        return false;
    
    const {referencePaths} = eslint;
    
    for (const {parentPath} of referencePaths) {
        if (!parentPath.isCallExpression())
            continue;
        
        const argumentsPath = parentPath.get('arguments.0');
        
        if (!argumentsPath.isObjectExpression())
            continue;
        
        for (const {key} of argumentsPath.node.properties) {
            if (t.isIdentifier(key, {name: 'rulesdir'}))
                return true;
        }
    }
    
    return false;
}
