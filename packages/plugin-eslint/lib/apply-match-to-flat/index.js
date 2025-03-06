'use strict';

const {
    template,
    operator,
    types,
} = require('putout');

const {
    identifier,
    callExpression,
    spreadElement,
    stringLiteral,
    objectProperty,
    isStatement,
    objectExpression,
} = types;

const {
    insertBefore,
    remove,
    getProperties,
    __json,
} = operator;

module.exports.report = () => `Apply 'matchToFlat()'`;

const createMatchToFlat = template('export const match = %%match%%');

module.exports.exclude = () => [__json];

module.exports.fix = ({objects}) => {
    const statementPath = objects[0].find(isStatement);
    const match = objectExpression([]);
    let added = false;
    
    for (const object of objects) {
        const {filesPath, rulesPath} = getProperties(object, ['files', 'rules']);
        const {value} = filesPath.node.value.elements[0];
        
        match.properties.push(objectProperty(stringLiteral(value), rulesPath.node.value));
        
        if (!added) {
            added = true;
            const node = spreadElement(callExpression(identifier('matchToFlat'), [identifier('match')]));
            
            object.parentPath.node.elements.push(node);
        }
        
        remove(object);
    }
    
    insertBefore(statementPath, createMatchToFlat({
        match,
    }));
};

module.exports.traverse = ({push, pathStore, store}) => ({
    ObjectExpression(path) {
        if (!path.parentPath.isArrayExpression())
            return;
        
        if (path.node.properties.length !== 2)
            return;
        
        const {filesPath, rulesPath} = getProperties(path, ['files', 'rules']);
        
        if (!filesPath || !rulesPath)
            return;
        
        pathStore(path);
    },
    'export const match = __'() {
        store('match', true);
    },
    Program: {
        exit(path) {
            if (store('match'))
                return;
            
            const objects = pathStore();
            
            if (!objects.length)
                return;
            
            push({
                path,
                objects,
            });
        },
    },
});
