'use strict';

const {types, operator} = require('putout');
const {
    objectProperty,
    identifier,
    objectExpression,
    arrayExpression,
} = types;

const {
    traverseProperties,
    getTemplateValues,
    remove,
} = operator;

const DEFINE_CONFIG = 'defineConfig(__object)';
const getNode = (path) => path.node;

module.exports.report = () => `Use 'browser.instances'`;

module.exports.fix = ({path, properties}) => {
    const nodes = properties.map(getNode);
    const value = arrayExpression([
        objectExpression(nodes),
    ]);
    
    const instances = identifier('instances');
    const property = objectProperty(instances, value);
    
    properties.map(remove);
    path.node.value.properties = [property];
};

module.exports.traverse = ({push}) => ({
    'defineConfig(__object)': (path) => {
        const {__object} = getTemplateValues(path, DEFINE_CONFIG);
        const [instancesPath] = traverseProperties(__object, 'instances');
        
        if (instancesPath)
            return;
        
        const [browserPath] = traverseProperties(__object, 'browser');
        const properties = browserPath.get('value.properties');
        
        push({
            path: browserPath,
            properties,
        });
    },
});
