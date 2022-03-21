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

module.exports.traverse = ({listStore, push}) => ({
    VariableDeclarator(path) {
        const idPath = path.get('id');
        const initPath = path.get('init');
        
        if (!idPath.isObjectPattern())
            return;
        
        if (!initPath.isMemberExpression() && !initPath.isCallExpression())
            return;
        
        listStore([initPath, idPath]);
    },
    Program: {
        exit: exit({
            push,
            items: listStore(),
        }),
    },
});

const exit = ({push, items}) => () => {
    for (const [initPath] of items) {
        for (const [currentPath, expandPath] of items) {
            const objectPath = initPath.get('object');
            
            if (!objectPath.isMemberExpression() && !objectPath.isCallExpression())
                continue;
            
            const propertyPath = initPath.get('property');
            const property = propertyPath.node;
            
            if (!propertyPath.isIdentifier())
                continue;
            
            const current = currentPath.node;
            const {object} = initPath.node;
            const {name} = property;
            
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
    }
};
