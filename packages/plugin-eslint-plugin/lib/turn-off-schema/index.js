'use strict';

const {types, operator} = require('putout');

const {traverseProperties} = operator;
const {BooleanLiteral} = types;

module.exports.report = () => `Turn off schema`;

module.exports.fix = (path) => {
    path.node.value = BooleanLiteral(false);
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        traverseProperties(path, 'schema').map(push);
    },
});
