'use strict';

const {
    generate,
    operate,
} = require('putout');

const {replaceWith} = operate;

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
            
            if (!idPath.isObjectPattern())
                return;
            
            if (!initPath.isMemberExpression() && !initPath.isCallExpression())
                return;
            
            members.push([generate(initPath.node).code, idPath]);
            
            const objectPath = initPath.get('object');
            
            if (!objectPath.isMemberExpression() && !objectPath.isCallExpression())
                return;
            
            const propertyPath = initPath.get('property');
            const property = propertyPath.node;
            
            if (!propertyPath.isIdentifier())
                return;
            
            const {code} = generate(initPath.node.object);
            
            for (const [currentCode, expandPath] of members) {
                const {name} = property;
                
                if (expandPath.scope.bindings[name])
                    continue;
                
                if (expandPath.scope.uid !== initPath.scope.uid)
                    continue;
                
                if (currentCode === code) {
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

