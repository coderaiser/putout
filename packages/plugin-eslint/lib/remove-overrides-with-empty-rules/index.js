import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Avoid 'overrides' with empty 'rules'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const {key, value} = path.node;
        
        if (key.value !== 'rules')
            return;
        
        if (value.properties.length)
            return;
        
        const {parentPath: overridesPath} = path.parentPath.parentPath;
        
        if (overridesPath.isExpressionStatement())
            return push(path);
        
        if (overridesPath.node.key.value !== 'overrides')
            return;
        
        if (overridesPath.node.value.elements.length > 1) {
            push(path.parentPath);
            return;
        }
        
        push(overridesPath);
    },
});
