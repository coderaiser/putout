import {operator} from 'putout';

const {__json, __toml} = operator;

export const report = () => `Convert '*.json' to '*.toml'`;

export const replace = () => ({
    [__json]: __toml,
});
