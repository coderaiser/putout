import {types, operator} from 'putout';

const {
    templateElement,
    templateLiteral,
} = types;

export const report = () => `Use backticks instead of quotes`;

export const fix = (path) => {
    const value = path
        .node
        .value
        .replaceAll('\\', '\\\\')
        .replaceAll('\n', '\\n');
    
    const {parentPath} = path;
    
    if (parentPath.isObjectProperty() && path === parentPath.get('key'))
        parentPath.node.computed = true;
    
    replaceWith(path, templateLiteral([templateElement({
        raw: value,
    })], []));
};

const {replaceWith} = operator;

export const traverse = ({push}) => ({
    StringLiteral(path) {
        const {value} = path.node;
        
        if (value.includes('${'))
            return;
        
        if (value.includes('`'))
            return;
        
        if (value.includes(`'`))
            push(path);
    },
});
