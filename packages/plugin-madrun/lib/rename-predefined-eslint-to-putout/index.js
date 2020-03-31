'use strict';

const {types: t} = require('putout');

module.exports.report = () => `"putout" should be used instead of "eslint", when predefined`;

module.exports.fix = ({eslint}) => {
    eslint.scope.rename('eslint', 'putout');
};

module.exports.traverse = ({push}) => {
    return {
        'const __object = predefined'(path) {
            const properties = path.get('declarations.0.id.properties');
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
        const argumentsPath = parentPath.get('arguments.0');
        
        for (const {key} of argumentsPath.node.properties) {
            if (t.isIdentifier(key, {name: 'rulesdir'}))
                return true;
        }
    }
    
    return false;
}
