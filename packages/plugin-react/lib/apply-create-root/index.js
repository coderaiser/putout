import {
    template,
    operator,
    types,
} from 'putout';

const {isArrowFunctionExpression} = types;
const {insertAfter, getBindingPath} = operator;
const notRender = ({imported}) => imported.name !== 'render';

const notDeclaredRoot = (vars, path) => !path.scope.bindings.root;

const nodeCreateImport = template.ast(`import {createRoot} from 'react-dom/client'`);

export const report = () => `Use 'createRoot()' instead of 'render()'`;

export const match = () => ({
    'import __imports from "react-dom"': notDeclaredRoot,
    'render(__a, __b)': (vars, path) => {
        const bindingPath = getBindingPath(path, 'render');
        
        if (bindingPath && isArrowFunctionExpression(bindingPath.parentPath))
            return false;
        
        return notDeclaredRoot(vars, path);
    },
});

export const replace = () => ({
    'import __imports from "react-dom"': ({__imports}, path) => {
        path.node.specifiers = __imports.filter(notRender);
        
        insertAfter(path, nodeCreateImport);
        
        if (!path.node.specifiers.length)
            return '';
        
        return path;
    },
    'render(__a, __b)': `{
        const root = createRoot(__b);
        root.render(__a);
    }`,
});
