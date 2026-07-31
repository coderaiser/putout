import {types, operator} from 'putout';

const {
    getProperties,
    __toml,
    replaceWith,
} = operator;

const {
    arrayExpression,
    objectExpression,
    stringLiteral,
    objectProperty,
} = types;

export const report = () => `Use 'format_overrides' instead of 'format'`;

export const fix = (path) => {
    const {value} = path.node;
    const property = objectProperty(stringLiteral('format_overrides'), objectExpression([path.node]));
    
    path.node.key = stringLiteral('formats');
    path.node.value = arrayExpression([value]);
    
    replaceWith(path, property);
};

export const traverse = ({push}) => ({
    [__toml]: (path) => {
        const __aPath = path.get('arguments.0');
        const {archivesPath} = getProperties(__aPath, ['archives']);
        
        if (!archivesPath)
            return;
        
        const {formatPath} = getProperties(archivesPath.get('value'), ['format']);
        
        if (!formatPath)
            return;
        
        push(formatPath);
    },
});/*
archives:
  - format_overrides:
      - formats: ["zip"]
*/

