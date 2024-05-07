'use strict';

const {template, operator} = require('putout');

const {insertAfter} = operator;
const notRender = ({imported}) => imported.name !== 'render';
const notDeclaredRoot = (vars, path) => !path.scope.bindings.root;

const nodeCreateImport = template.ast(`import {createRoot} from 'react-dom/client'`);

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.match = () => ({
    'import __imports from "react-dom"': notDeclaredRoot,
    'render(__a, __b)': notDeclaredRoot,
});

module.exports.replace = () => ({
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
