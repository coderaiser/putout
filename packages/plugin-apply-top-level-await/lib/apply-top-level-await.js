'use strict';

const fullstore = require('fullstore');
const {replaceWithMultiple} = require('putout').operator;

const add = ({push, isImports, isExports}) => (path) => {
    const calleePath = path.get('callee');
    
    if (!isImports() && !isExports())
        return;
    
    const {id} = calleePath.node;
    
    if (id)
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
    const addPath = add({
        push,
        isImports,
        isExports,
    });
    
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
        '(async function __() {})()': addPath,
        '(async () => __)()': addPath,
    };
};

