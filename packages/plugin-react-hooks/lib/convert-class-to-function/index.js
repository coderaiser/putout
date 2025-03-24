import {types} from 'putout';
import classToFunction from './class-to-function.js';
import {traverseClass} from '../common.js';

const {isIdentifier, isClassMethod} = types;

export const report = ({name}) => {
    return `class ${name} should be a function`;
};

export const fix = ({path}) => {
    classToFunction(path);
};

export const find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        Identifier(path) {
            const {name} = path.node;
            const {parentPath} = path;
            
            if (!hasLifeCycle(parentPath))
                push({
                    path: parentPath,
                    name,
                });
            
            path.stop();
        },
    });
};

function hasLifeCycle(path) {
    const {body} = path.node.body;
    
    for (const current of body) {
        if (!isClassMethod(current))
            continue;
        
        if (isIdentifier(current.key, {name: 'componentWillUnmount'}))
            return true;
    }
    
    return false;
}
