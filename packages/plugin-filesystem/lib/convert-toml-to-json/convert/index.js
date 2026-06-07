import {operator} from 'putout';

const {__toml, __json} = operator;

export const report = () => `Convert '*.toml' to '*.json'`;

export const replace = () => ({
    [__toml]: __json,
});
