'use strict';

const {
    operator,
    types,
} = require('putout');

const {ObjectProperty} = types;

const {
    replaceWith,
    compare,
} = operator;

const SHORTHAND = true;
const COMPUTED = false;

module.exports.report = () => `Extract object properties into variables`;

module.exports.fix = ({path, expandPath, property}) => {
    const newProperty = ObjectProperty(property, property, COMPUTED, SHORTHAND);
    
    expandPath.node.properties.push(newProperty);
    replaceWith(path, property);
};

module.exports.traverse = ({listStore, push}) => ({
    'const __object = __a.__b': save({
        listStore,
    }),
    'const __object = __a(__args)': save({
        listStore,
    }),
    'Program': {
        exit: exit({
            push,
            listStore,
        }),
    },
});

const save = ({listStore}) => (path) => {
    const idPath = path.get('declarations.0.id');
    const initPath = path.get('declarations.0.init');
    
    listStore([initPath, idPath]);
};

const exit = ({push, listStore}) => () => {
    const items = listStore();
    
    for (const [initPath] of items) {
        for (const [currentPath, expandPath] of items) {
            const objectPath = initPath.get('object');
            
            if (!objectPath.isMemberExpression() && !objectPath.isCallExpression())
                continue;
            
            const propertyPath = initPath.get('property');
            const property = propertyPath.node;
            
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
