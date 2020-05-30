'use strict';

const {operator} = require('putout');

const {
    replaceWith,
    compare,
} = operator;

module.exports.report = () => `Object properties should be extracted into variables`;

module.exports.fix = ({path, expandPath, property}) => {
    expandPath.node.properties.push(property);
    replaceWith(path, property);
};

module.exports.traverse = ({push}) => {
    const members = [];
    
    return {
        VariableDeclarator(path) {
            const idPath = path.get('id');
            const initPath = path.get('init');
            
            if (!initPath.scope)
                return;
            
            if (!idPath.isObjectPattern())
                return;
            
            if (!initPath.isMemberExpression() && !initPath.isCallExpression())
                return;
            
            members.push([initPath.node, idPath]);
            
            const objectPath = initPath.get('object');
            
            if (!objectPath.isMemberExpression() && !objectPath.isCallExpression())
                return;
            
            const propertyPath = initPath.get('property');
            const property = propertyPath.node;
            
            if (!propertyPath.isIdentifier())
                return;
            
            const {object} = initPath.node;
            
            for (const [current, expandPath] of members) {
                const {name} = property;
                
                if (!expandPath.scope)
                    continue;
                
                if (expandPath.scope.bindings[name])
                    continue;
                
                if (expandPath.scope.uid !== initPath.scope.uid)
                    continue;
                
                if (compare(object, current)) {
                    push({
                        expandPath,
                        path: initPath,
                        property,
                    });
                }
            }
        },
    };
};

