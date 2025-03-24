import {types, operator} from 'putout';

const {replaceWith} = operator;
const {stringLiteral} = types;

export const report = () => `Use 'String (on/off)' instead of 'Boolean (true/false)'`;

export const fix = (path) => {
    const {value} = path.node;
    const newValue = stringLiteral(value ? 'on' : 'off');
    
    replaceWith(path, newValue);
};

export const traverse = ({push}) => ({
    '__putout_processor_json(__object)'(path) {
        const objectPath = path.get('arguments.0');
        
        const propPaths = [
            ...getProperties('rules', objectPath),
            ...getMatchProperties(objectPath),
        ];
        
        for (const propPath of propPaths) {
            const valuePath = propPath.get('value');
            
            if (valuePath.isBooleanLiteral()) {
                push(valuePath);
                continue;
            }
            
            if (valuePath.isArrayExpression()) {
                const firstPath = valuePath.get('elements.0');
                
                if (firstPath.isBooleanLiteral())
                    push(firstPath);
                
                continue;
            }
        }
    },
});

function getProperties(name, objectPath) {
    for (const propPath of objectPath.get('properties')) {
        const keyPath = propPath.get('key');
        
        if (keyPath.node.value === name)
            return propPath.get('value.properties');
    }
    
    return [];
}

function getMatchProperties(objectPath) {
    const result = [];
    
    for (const propPath of getProperties('match', objectPath)) {
        result.push(...propPath.get('value.properties'));
    }
    
    return result;
}
