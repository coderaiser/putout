import {types, operator} from 'putout';

const {
    objectPattern,
    isIdentifier,
    objectProperty,
    isObjectProperty,
    isObjectExpression,
} = types;

const {
    getBindingPath,
    getTemplateValues,
} = operator;

const SHORTHAND = true;
const COMPUTED = false;

export const report = ({node}) => {
    const {name} = node;
    return `Declare template variable '${name}'`;
};

export const fix = ({path, node}) => {
    const {params} = path.node;
    const property = objectProperty(node, node, COMPUTED, SHORTHAND);
    
    if (!params.length) {
        const properties = [property];
        
        params.push(objectPattern(properties));
        
        return;
    }
    
    const [first] = params;
    
    if (isIdentifier(first)) {
        path.node.params[0] = objectPattern([property]);
        return;
    }
    
    path.node.params[0].properties.push(property);
};

export const traverse = ({push}) => ({
    '(__a, path) => __b': process(push),
    '(__a) => __b': process(push),
    '() => __b': process(push),
});

const process = (push) => (path) => {
    const {parentPath} = path;
    const {__b} = getTemplateValues(path, '(__args) => __b');
    
    if (isObjectExpression(__b))
        return;
    
    if (!parentPath.isObjectProperty())
        return;
    
    if (!isReplacer(path))
        return;
    
    path.traverse({
        ReferencedIdentifier(refPath) {
            const {node} = refPath;
            const {name} = node;
            
            if (!name.startsWith('__'))
                return;
            
            if (getBindingPath(refPath, name))
                return;
            
            push({
                path,
                node,
            });
        },
    });
};

function isReplacer({parentPath}) {
    const currentPath = parentPath.parentPath.parentPath.parentPath;
    
    if (!isObjectProperty(currentPath))
        return true;
    
    const {key} = currentPath.node;
    
    return isIdentifier(key, {
        name: 'replace',
    });
}
