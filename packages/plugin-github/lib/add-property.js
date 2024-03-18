'use strict';

const {types, operator} = require('putout');

const {
    getTemplateValues,
    getProperties,
    traverseProperties,
    __yaml,
} = operator;

const {
    StringLiteral,
    ObjectProperty,
    BooleanLiteral,
} = types;

module.exports.addProperty = (name, property, value) => ({
    traverse: traverse(name, property),
    fix: fix(property, value),
    report: report(name, property),
});

const report = (name, property) => () => `Add '${property}' to '${name}'`;

const fix = (property, value) => (path) => {
    const keyNode = StringLiteral(property);
    const valueNode = BooleanLiteral(value);
    const node = ObjectProperty(keyNode, valueNode);
    
    path.node.properties.splice(2, 0, node);
};

const traverse = (name, property) => ({push}) => ({
    [__yaml](path) {
        const {__object} = getTemplateValues(path, __yaml);
        
        for (const propertyPath of traverseProperties(__object, 'uses')) {
            const valuePath = propertyPath.get('value');
            const {value} = valuePath.node;
            
            if (!value.startsWith(name))
                continue;
            
            const {parentPath} = propertyPath;
            
            const {[`${property}Path`]: current} = getProperties(parentPath, [property]);
            
            if (current)
                return;
            
            push(parentPath);
        }
    },
});
