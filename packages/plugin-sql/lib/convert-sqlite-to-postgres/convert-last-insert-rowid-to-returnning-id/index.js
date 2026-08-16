import {template, operator} from 'putout';

const {remove} = operator;
const element = template.ast('returning(id)');

export const report = () => `Use 'returning id', instead of 'lastInsertRowid()'`;

export const fix = (path) => {
    const prev = path.getPrevSibling();
    remove(path);
    prev.node.arguments.push(element);
};
export const include = () => [
    'select(lastInsertRowid())',
];
