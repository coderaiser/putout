'use strict';

const {
    isIdentifier,
    isObjectPattern,
} = require('putout').types;

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = ({node}) => {
    node.key.name = 'useState';
    node.value.name = 'useState';
};

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclarator(path) {
            const {id, init} = path.node;
            
            const name = 'React';
            
            if (!isObjectPattern(id) || !isIdentifier(init, {name}))
                return;
            
            const propertiesPaths = path.get('id.properties');
            
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

