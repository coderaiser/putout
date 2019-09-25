'use strict';

const {
    types: t,
    operate,
} = require('putout');
const {replaceWith} = operate;

const NOT_COMPUTED = false;
const SHORTHAND = true;

module.exports.report = () => `fs.promises should be used instead of fs`;

module.exports.fix = ({path, promisified}) => {
    const props = [];
    
    for (const path of promisified) {
        const [declarator] = path.node.declarations;
        const {name} = declarator.id;
        
        props.push(t.ObjectProperty(t.Identifier(name), t.Identifier(name), NOT_COMPUTED, SHORTHAND));
        path.remove();
    }
    
    const {init} = path.node;
    
    replaceWith(path.get('id'), t.ObjectPattern(props));
    replaceWith(path.get('init'), t.MemberExpression(init, t.Identifier('promises')));
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
};

