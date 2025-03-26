import {operator} from 'putout';

const {__json} = operator;

export const report = () => `Convert '*.js' to '*.json'`;

export const replace = () => ({
    'export default __object': __json,
    'module.exports = __object': __json,
});
