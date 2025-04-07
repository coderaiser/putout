import {operator} from 'putout';

const {replaceWith} = operator;

export const report = (path) => {
    return `Remove useless 'Provider': '${path}' -> '${path.node.object.name}'`;
};

export const fix = (path) => {
    replaceWith(path, path.node.object);
};

export const traverse = ({push}) => ({
    JSXIdentifier(path) {
        if (path.node.name !== 'Provider')
            return;
        
        if (!path.parentPath.isJSXMemberExpression())
            return;
        
        if (path !== path.parentPath.get('property'))
            return;
        
        push(path.parentPath);
    },
});
