import {types, operator} from 'putout';

const {
    getProperties,
    __yaml,
    setLiteralValue,
} = operator;

const {
    objectExpression,
    stringLiteral,
    objectProperty,
} = types;

const isContentsKey = ({key}) => key.value === 'contents';
const isWriteValue = ({value}) => value.value === 'write';

export const report = () => `'permissions.content = write'`;

export const fix = ({path, permissionsPath, propertyValuePath}) => {
    if (propertyValuePath) {
        setLiteralValue(propertyValuePath, 'write');
        return;
    }
    
    if (permissionsPath) {
        permissionsPath.node.value.properties.push(objectProperty(stringLiteral('contents'), stringLiteral('write')));
        return;
    }
    
    const property = objectProperty(stringLiteral('permissions'), objectExpression([
        objectProperty(stringLiteral('contents'), stringLiteral('write')),
    ]));
    
    path.node.properties.splice(1, 0, property);
};

export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const objectPath = path.get('arguments.0');
        
        const {
            namePath,
            permissionsPath,
        } = getProperties(objectPath, ['name', 'permissions']);
        
        if (!namePath)
            return;
        
        if (permissionsPath) {
            const permissionsProperties = permissionsPath.get('value.properties');
            
            for (const property of permissionsProperties) {
                const {node} = property;
                
                if (isContentsKey(node) && isWriteValue(node))
                    return;
                
                if (isContentsKey(node) && !isWriteValue(node)) {
                    const propertyValuePath = property.get('value');
                    
                    push({
                        path: objectPath,
                        propertyValuePath,
                    });
                    
                    return;
                }
            }
        }
        
        push({
            path: objectPath,
            permissionsPath,
        });
    },
});
