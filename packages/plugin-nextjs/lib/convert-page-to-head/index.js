'use strict';

const {operator} = require('putout');
const {
    remove,
    traverse,
} = operator;

module.exports.report = () => `Use 'Head' instead of 'Page'`;

module.exports.include = () => [
    '<Head>__</Head>',
];

module.exports.fix = (path) => {
    const {node} = path.parentPath;
    
    node.children = path.node.children;
    path.scope.block.id.name = 'Head';
    
    traverse(path.scope.getProgramParent().path, {
        'import Head from "next/head"': (path) => {
            remove(path);
        },
    });
};

