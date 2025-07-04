import {operator} from 'putout';

const {remove, traverse} = operator;

export const report = () => `Use 'Head' instead of 'Page'`;

export const include = () => [
    '<Head>__</Head>',
];

export const fix = (path) => {
    const {node} = path.parentPath;
    
    node.children = path.node.children;
    path.scope.block.id.name = 'Head';
    
    traverse(path.scope
        .getProgramParent().path, {
        'import Head from "next/head"': (path) => {
            remove(path);
        },
    });
};
