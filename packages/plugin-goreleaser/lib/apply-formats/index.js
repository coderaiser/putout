import {types, operator} from 'putout';

const {
    getProperties,
    __yaml,
    setLiteralValue,
} = operator;

const {
    arrayExpression,
    isArrayExpression,
} = types;

export const report = () => `Use 'formats' instead of 'format'`;

export const fix = (path) => {
    const {value} = path.node;
    
    setLiteralValue(path.node.key, 'formats');
    path.node.value = arrayExpression([value]);
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
