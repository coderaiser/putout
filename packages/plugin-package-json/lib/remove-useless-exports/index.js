import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {__json, remove} = operator;

export const report = () => `Avoid useless 'exports'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const exportsPath = getExportsPath(path);
        
        if (!exportsPath)
            return;
        
        if (!isObjectExpression(exportsPath))
            return;
        
        const properties = exportsPath.get('properties');
        
        for (const property of properties) {
            const value = property.get('value');
            
            if (!isObjectExpression(value))
                continue;
            
            if (!value.node.properties.length)
                push(property);
        }
        
        if (!exportsPath.node.properties.length) {
            push(exportsPath.parentPath);
            return;
        }
    },
});

function getExportsPath(path) {
    const properties = path.get('arguments.0.properties');
    
    for (const prop of properties) {
        const keyPath = prop.get('key');
        const {value} = keyPath.node;
        
        if (value === 'exports')
            return prop.get('value');
    }
    
    return null;
}
