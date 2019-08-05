'use strict';

module.exports.report = () => `"putout" should be used instead of "eslint"`;

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

