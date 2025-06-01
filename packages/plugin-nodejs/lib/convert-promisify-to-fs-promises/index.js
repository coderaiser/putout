import {types, operator} from 'putout';

const {
    objectProperty,
    identifier,
    objectPattern,
} = types;

const {replaceWith, remove} = operator;

const NOT_COMPUTED = false;
const SHORTHAND = true;

export const report = () => `fs.promises should be used instead of fs`;

export const fix = ({path, promisified}) => {
    const props = [];
    
    for (const path of promisified) {
        const [declarator] = path.node.declarations;
        const {name} = declarator.id;
        
        props.push(objectProperty(
            identifier(name),
            identifier(name),
            NOT_COMPUTED,
            SHORTHAND,
        ));
        remove(path);
    }
    
    const {init} = path.node;
    
    init.arguments[0].value = 'fs/promises';
    
    replaceWith(path.get('id'), objectPattern(props));
};

export const find = (ast, {push, traverse}) => {
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
