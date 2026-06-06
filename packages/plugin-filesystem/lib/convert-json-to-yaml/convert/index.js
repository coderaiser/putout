import {operator} from 'putout';

const {__json, __yaml} = operator;

export const report = () => `Convert '*.json' to '*.yaml'`;

export const replace = () => ({
    [__json]: __yaml,
});
