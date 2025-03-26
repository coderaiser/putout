import {operator} from 'putout';

const {__json} = operator;

export const report = () => `Convert '*.json' to '*.js'`;

export const replace = () => ({
    [__json]: 'export default __object',
});
