import {operator, template} from 'putout';

const {
    compare,
    compareAny,
    replaceWith,
    remove,
} = operator;

export const report = () => `linebreak = indent + newline`;

const prev = (path) => path.parentPath.getPrevSibling();

export const fix = (path) => {
    const sibling = prev(path);
    const newNode = choose(path);
    
    remove(sibling);
    replaceWith(path, newNode);
};

export const include = () => [
    'print.newline()',
    'write.newline()',
];

export const filter = (path) => {
    return compareAny(prev(path), ['indent()', 'print.indent()', 'write.indent()']);
};

function choose(path) {
    if (compare(path, 'print.newline()'))
        return template.ast('print.linebreak()');
    
    return template.ast('write.linebreak()');
}
