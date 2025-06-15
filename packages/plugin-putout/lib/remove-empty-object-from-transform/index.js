import {types} from 'putout';

const {isFunction} = types;

export const report = () => `Avoid useless empty object passed to 't.transform()'`;

export const match = () => ({
    't.transform(__a, {})': (vars, {parentPath}) => {
        return isFunction(parentPath.parentPath.parentPath);
    },
});

export const replace = () => ({
    't.transform(__a, {})': 't.transform(__a)',
});
