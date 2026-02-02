import {types} from 'putout';

const {isFunction} = types;

export const report = () => `Use 'process.exit()' instead of top-level 'return'`;

export const filter = (path) => !path.findParent(isFunction);

export const replace = () => ({
    'return': 'process.exit()',
    'return __a': `{
        __a;
        process.exit();
    }`,
});
