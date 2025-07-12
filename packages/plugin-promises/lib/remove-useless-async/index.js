import {operator} from 'putout';

const {contains} = operator;

export const report = () => `Avoid useless 'async'`;

export const fix = (path) => {
    path.node.async = false;
};

export const exclude = () => ['__nop'];

export const include = () => [
    'async function __(__args) {}',
    'async (__args) => __body',
];

export const filter = (path) => !contains(path, [
    'throw __',
    'await __',
    'for await (__ of __) __',
    'await using __ = __',
]);
