import {operator} from 'putout';
import {traverseClass} from '../common.js';

const {replaceWith} = operator;

export const report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

export const fix = ({path}) => {
    replaceWith(path, path.get('property'));
};

export const find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        ThisExpression({parentPath}) {
            const propertyPath = parentPath.get('property');
            
            if (!parentPath.isMemberExpression())
                return;
            
            const {name} = propertyPath.node;
            
            push({
                name,
                path: parentPath,
            });
        },
    });
};
