'use strict';

const {
    isIdentifier,
    isObjectPattern,
} = require('putout').types;

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = (chunk) => {
    const {node} = chunk;
    
    node.key.name ='useState';
    node.value.name ='useState';
};

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclarator(chunk) {
            const {id, init} = chunk.node;
            
            const name = 'React';
            
            if (!isObjectPattern(id) || !isIdentifier(init, {name}))
                return;
            
            const propertiesPaths = chunk.id.properties;
            
            for (const propPath of propertiesPaths) {
                const {node} = propPath;
                
                if (isIdentifier(node.key, {name: 'Component'})) {
                    places.push(propPath);
                }
            }
        },
    });
    
    return places;
};

