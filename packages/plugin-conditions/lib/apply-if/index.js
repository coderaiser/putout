import {operator} from 'putout';

const {remove, replaceWith} = operator;

export const report = () => 'Avoid empty statement in if condition';

export const filter = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.node)
        return false;
    
    return path.get('consequent').isEmptyStatement();
};

export const include = () => [
    'IfStatement',
];

export const fix = (path) => {
    const nextPath = path.getNextSibling();
    const consequentPath = path.get('consequent');
    
    replaceWith(consequentPath, nextPath);
    remove(nextPath);
};
