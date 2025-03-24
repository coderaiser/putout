import {traverseClass} from '../common.js';

export const report = ({node}) => {
    const {name} = node;
    return `name of method "${name}" should not start from under score`;
};

export const fix = ({node}) => {
    const {name} = node;
    node.name = name.replace(/^_/, '');
};

export const find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        ClassMethod(path) {
            const keyPath = path.get('key');
            const {name} = keyPath.node;
            
            if (!name.indexOf('_'))
                push(keyPath);
        },
    });
};
