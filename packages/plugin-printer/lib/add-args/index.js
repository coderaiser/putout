import {operator} from 'putout';

const {addArgs} = operator;
const include = [
    '__ = __',
    'const __ = __',
    'module.exports.__a = (path, __object) => __body',
    'module.exports.__a = (path, __object, __b) => __body',
    'module.exports.__a = (path) => __body',
    'function __(path) {}',
    'function __(path, __object) {}',
];

const exclude = [
    '(__a, __b, __c, __object) => __body',
];

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['path', 'module.exports.__a = () => __body'],
    maybe: ['{maybe}', include, exclude],
    write: ['{write}', include, exclude],
    print: ['{print}', include, exclude],
    indent: ['{indent}', include, exclude],
    compute: ['{compute}', include, exclude],
    traverse: ['{traverse}', include, exclude],
    store: ['{store}', include, exclude],
});
