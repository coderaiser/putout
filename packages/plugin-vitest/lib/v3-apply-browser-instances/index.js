import {types, operator} from 'putout';

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

export const report = () => `Use 'browser.instances'`;

export const fix = ({path, properties}) => {
    const nodes = properties.map(getNode);
    const value = arrayExpression([
        objectExpression(nodes),
    ]);
    
    const instances = identifier('instances');
    const property = objectProperty(instances, value);
    
    properties.map(remove);
    path.node.value.properties = [property];
};

export const traverse = ({push}) => ({
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
