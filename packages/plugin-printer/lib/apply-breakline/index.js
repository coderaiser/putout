import {operator, template} from 'putout';

const {
    compare,
    compareAny,
    replaceWith,
    remove,
} = operator;

export const report = () => `breakline = newline + indent`;

const next = (path) => path.parentPath.getNextSibling();

export const fix = (path) => {
    const sibling = next(path);
    const newNode = choose(path);
    
    remove(sibling);
    replaceWith(path, newNode);
};

export const filter = (path) => {
    return compareAny(next(path), ['indent()', 'print.indent()', 'write.indent()']);
};

export const include = () => [
    'print.newline()',
    'write.newline()',
];

function choose(path) {
    if (compare(path, 'print.newline()'))
        return template.ast('print.breakline()');
    
    return template.ast('write.breakline()');
}
