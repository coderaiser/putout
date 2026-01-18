import {operator} from 'putout';

const {getProperties} = operator;
const {__json} = operator;

export const fix = () => {};
export const traverse = () => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {importsPath} = getProperties(__aPath, ['imports']);
    },
});
