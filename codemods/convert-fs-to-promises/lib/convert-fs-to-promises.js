'use strict';

const {
    types: t,
} = require('putout');

const NOT_COMPUTED = false;
const SHORTHAND = true;

module.exports.report = (path) => `fs.promises should be used instead of fs`;

module.exports.fix = ({path, promisified}) => {
    const props = [];
    
    for (const path of promisified) {
        const [declarator] = path.node.declarations;
        const {name} = declarator.id;
        
        props.push(t.ObjectProperty(t.Identifier(name), t.Identifier(name), NOT_COMPUTED, SHORTHAND))
        path.remove();
    }
    
    const {init} = path.node;
    
    path.get('id').replaceWith(t.ObjectPattern(props));
    path.get('init').replaceWith(t.MemberExpression(init, t.Identifier('promises')));
};

module.exports.find = (ast, {push, traverse}) => {
    const fs = [];
    const promisified = [];
    
    traverse(ast, {
        'const fs = require("fs")'(path) {
            fs.push(path);
        },
        'const __ = promisify(fs.__)'(path) {
            promisified.push(path);
        },
    });
    
    const [fsPath] = fs;
    
    if (!fsPath)
        return;
    
    if (!promisified.length)
        return;
    
    push({
        path: fsPath.get('declarations.0'),
        promisified,
    });
}

