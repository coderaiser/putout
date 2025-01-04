import {operator, types} from 'putout';

const {isObjectExpression} = types;
const {getProperty, __json} = operator;

export const report = ({key, value}) => {
    return `${key} -> ${value}`;
};

export const fix = () => {};

export const traverse = ({push}) => ({
    [__json](path) {
        const object = path.get('arguments.0');
        const exportsPath = getProperty(object, 'exports');
        
        if (!exportsPath)
            return;
        
        const objectPath = exportsPath.get('value');
        
        if (!isObjectExpression(objectPath))
            return;
        
        for (const property of objectPath.get('properties')) {
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            
            if (valuePath.isObjectExpression()) {
                processNested({
                    push,
                    keyPath,
                    valuePath,
                });
                continue;
            }
            
            push({
                path: property,
                key: keyPath.node.value,
                value: valuePath.node.value,
            });
        }
    },
});

function processNested({push, keyPath, valuePath}) {
    const root = keyPath.node.value;
    
    for (const property of valuePath.get('properties')) {
        const valuePath = property.get('value');
        const keyPath = property.get('key');
        
        if (valuePath.isObjectExpression()) {
            processNested({
                push,
                keyPath,
                valuePath,
            });
            continue;
        }
        
        const key = `${root}+${keyPath.node.value}`;
        const {value} = valuePath.node;
        
        push({
            key,
            value,
            path: property,
        });
    }
}
