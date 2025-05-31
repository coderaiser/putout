import {operator} from 'putout';

const {remove} = operator;

export const report = () => 'Avoid useless empty static blocks';

export const fix = (path) => remove(path);

export const filter = (path) => !path.node.body.length;

export const include = () => [
    'StaticBlock',
];
