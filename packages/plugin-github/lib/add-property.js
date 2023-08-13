'use strict';

const {types, operator} = require('putout');
const {
    getTemplateValues,
    getProperties,
    traverseProperties,
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
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const propertyPath of traverseProperties(__a, 'uses')) {
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
