import {operator} from 'putout';

const {__yaml, __toml} = operator;

export const report = () => `Convert '*.yaml' to '*.toml'`;

export const replace = () => ({
    [__yaml]: __toml,
});
