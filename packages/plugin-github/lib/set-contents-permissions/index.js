import {types, operator} from 'putout';

const {getProperties, __yaml} = operator;

const {
    objectExpression,
    stringLiteral,
    objectProperty,
} = types;

export const report = () => `'permirmissions.content = write'`;

export const fix = ({path, permissionsPath}) => {
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
        
        if (!permissionsPath) {
            push({
                path: objectPath,
                permissionsPath,
            });
            return;
        }
        
        const permissionsProperties = permissionsPath.get('value.properties');
        
        for (const property of permissionsProperties) {
            if (property.node.key.value === 'contents')
                return;
        }
        
        push({
            path: objectPath,
            permissionsPath,
        });
    },
});
