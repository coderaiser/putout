'use strict';

const fullstore = require('fullstore');

const {replaceWithMultiple} = require('putout').operate;

const add = ({push, isImports, isExports}) => (path) => {
    const calleePath = path.get('callee');
    
    if (!isImports() && !isExports())
        return;
    
    const {id, params} = calleePath.node;
    
    if (id)
        return;
    
    if (params.length)
        return;
    
    push(path);
};

module.exports.report = () => 'Top-level-await should be used';

module.exports.fix = (path) => {
    const {body} = path.get('callee.body').node;
    replaceWithMultiple(path, body);
};

module.exports.traverse = ({push}) => {
    const isExports = fullstore();
    const isImports = fullstore();
    
    return {
        'import __ from "__"'() {
            isImports(true);
        },
        ExportNamedDeclaration() {
            isExports(true);
        },
        ExportDefaultDeclaration() {
            isExports(true);
        },
        '(async function __() {})()':add({push, isImports, isExports}),
        '(async () => __)()': add({push, isImports, isExports}),
    };
};

