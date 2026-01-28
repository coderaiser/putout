import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Avoid 'console' call`;

export const fix = (path) => {
    remove(path);
};

export const filter = ({scope}) => !scope.hasBinding('console');

export const include = () => [
    `console.__a(__args)`,
    `console[__a](__args)`,
];
