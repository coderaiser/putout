import {operator} from 'putout';

const {__yaml, __json} = operator;

export const report = () => `Convert '*.yaml' to '*.json'`;

export const replace = () => ({
    [__yaml]: __json,
});
