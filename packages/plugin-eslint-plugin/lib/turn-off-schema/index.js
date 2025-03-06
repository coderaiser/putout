'use strict';

const {types, operator} = require('putout');
const {traverseProperties} = operator;
const {booleanLiteral} = types;

module.exports.report = () => `Turn off schema`;

module.exports.fix = (path) => {
    path.node.value = booleanLiteral(false);
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        const [schema] = traverseProperties(path, 'schema');
        
        if (!schema)
            return;
        
        if (!schema.get('value').isBooleanLiteral())
            push(schema);
    },
});
