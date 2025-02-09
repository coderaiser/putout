'use strict';

const {types, operator} = require('putout');

const {
    traverseProperties,
    getTemplateValues,
    remove,
} = operator;

const {
    ObjectProperty,
    Identifier,
    ObjectExpression,
    ArrayExpression,
} = types;

const DEFINE_CONFIG = 'defineConfig(__object)';
const getNode = (path) => path.node;

module.exports.report = () => `Use 'browser.instances'`;

module.exports.fix = ({path, properties}) => {
    const nodes = properties.map(getNode);
    const value = ArrayExpression([
        ObjectExpression(nodes),
    ]);
    
    const instances = Identifier('instances');
    const property = ObjectProperty(instances, value);
    
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
