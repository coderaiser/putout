import {types, operator} from 'putout';

const {replaceWith} = operator;
const {
    tsNeverKeyword,
    tsTypeParameterInstantiation,
    identifier,
    tsTypeReference,
} = types;

export const report = () => `Use 'Record<PropertyKey, never>' instead of '{}'`;

export const fix = (path) => {
    const propertyKey = tsTypeReference(identifier('PropertyKey'));
    const defaultType = tsTypeReference(identifier('Record'), tsTypeParameterInstantiation([propertyKey, tsNeverKeyword()]));
    
    replaceWith(path, defaultType);
};

export const traverse = ({push}) => ({
    TSTypeLiteral(path) {
        const {node, parentPath} = path;
        
        if (node.members.length)
            return;
        
        if (node !== parentPath.node.default)
            return;
        
        push(path);
    },
});
