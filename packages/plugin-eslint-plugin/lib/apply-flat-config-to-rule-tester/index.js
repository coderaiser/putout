import {operator, types} from 'putout';

const {
    objectExpression,
    identifier,
    objectProperty,
} = types;

const {traverseProperties} = operator;

export const report = () => `Use FlatConfig in RuleTester`;

export const fix = (path) => {
    const {properties} = path.node;
    
    path.node.properties = [
        objectProperty(identifier('languageOptions'), objectExpression(properties)),
    ];
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const {parentPath} = path;
        
        if (!parentPath.isNewExpression())
            return;
        
        const a = traverseProperties(path, 'languageOptions');
        
        if (a.length)
            return;
        
        push(path);
    },
});
