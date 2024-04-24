'use strict';

const {
    template,
    operator,
    types,
} = require('putout');

const {
    insertBefore,
    remove,
    getProperties,
    __json,
} = operator;

const {
    Identifier,
    SpreadElement,
    StringLiteral,
    ObjectProperty,
    ObjectExpression,
    isStatement,
} = types;

module.exports.report = () => `Apply 'matchToFlat()'`;

const createMatchToFlat = template('const config = matchToFlat(%%match%%)');

module.exports.exclude = () => [__json];

module.exports.fix = ({objects}) => {
    const statementPath = objects[0].find(isStatement);
    const match = ObjectExpression([]);
    let added = false;
    
    for (const object of objects) {
        const {filesPath, rulesPath} = getProperties(object, ['files', 'rules']);
        const {value} = filesPath.node.value.elements[0];
        
        match.properties.push(ObjectProperty(StringLiteral(value), rulesPath.node.value));
        
        if (!added) {
            added = true;
            object.parentPath.node.elements.push(SpreadElement(Identifier('config')));
        }
        
        remove(object);
    }
    
    insertBefore(statementPath, createMatchToFlat({
        match,
    }));
};

module.exports.traverse = ({push, pathStore}) => ({
    ObjectExpression(path) {
        if (!path.parentPath.isArrayExpression())
            return;
        
        pathStore(path);
    },
    Program: {
        exit(path) {
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
