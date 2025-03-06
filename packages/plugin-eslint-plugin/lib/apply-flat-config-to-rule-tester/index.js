'use strict';

const {operator, types} = require('putout');
const {
    objectExpression,
    identifier,
    objectProperty,
} = types;
const {traverseProperties} = operator;

module.exports.report = () => `Use FlatConfig in RuleTester`;

module.exports.fix = (path) => {
    const {properties} = path.node;
    
    path.node.properties = [
        objectProperty(identifier('languageOptions'), objectExpression(properties)),
    ];
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        const {parentPath} = path;
        
        if (!parentPath.isNewExpression())
            return;
        
        const a = traverseProperties(path, 'languageOptions');
        
        if (a.length)
            return;
        
        push(path);
    },
});
