import {operator} from 'putout';

const {__toml, __yaml} = operator;

export const report = () => `Convert '*.toml' to '*.yaml'`;

export const replace = () => ({
    [__toml]: __yaml,
});
