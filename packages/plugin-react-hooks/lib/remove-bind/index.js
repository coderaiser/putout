import {operator} from 'putout';
import {traverseClass} from '../common.js';

const {remove} = operator;

export const report = () => 'bind should not be used';

export const fix = (path) => {
    remove(path);
};

export const find = (ast, {traverse, push}) => {
    traverseClass(traverse, ast, {
        CallExpression(path) {
            const isBind = path.get('callee.property').isIdentifier({
                name: 'bind',
            });
            
            const {parentPath} = path;
            
            if (isBind)
                push(parentPath);
        },
    });
};
