import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'clearErrors' instead of 'clearError'`;

export const fix = (path) => {
    const program = path.scope.getProgramParent().path;
    rename(program, 'clearError', 'clearErrors');
};

export const include = () => [
    'clearError(__args)',
];
