import {types, operator} from 'putout';

const {
    getProperties,
    __yaml,
    replaceWith,
} = operator;

const {
    arrayExpression,
    objectExpression,
    stringLiteral,
    objectProperty,
    isArrayExpression,
} = types;

export const report = () => `Use 'format_overrides' instead of 'format'`;

export const fix = (path) => {
    const {value} = path.node;
    const property = objectProperty(stringLiteral('format_overrides'), arrayExpression([
        objectExpression([path.node]),
    ]));
    
    path.node.key = stringLiteral('formats');
    path.node.value = arrayExpression([value]);
    
    replaceWith(path, property);
};

export const traverse = ({push}) => ({
    [__yaml]: (path) => {
        const __aPath = path.get('arguments.0');
        const {archivesPath} = getProperties(__aPath, ['archives']);
        
        if (!archivesPath)
            return;
        
        const valuePath = archivesPath.get('value');
        
        if (!isArrayExpression(valuePath))
            return false;
        
        for (const current of valuePath.get('elements')) {
            const {formatPath} = getProperties(current, ['format']);
            
            if (!formatPath)
                return;
            
            push(formatPath);
        }
    },
});
