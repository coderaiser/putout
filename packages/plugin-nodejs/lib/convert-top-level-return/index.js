import {types} from 'putout';

const {isFunction} = types;

export const report = () => `"process.exit" should be used instead of top-level return`;

export const filter = (path) => !path.findParent(isFunction);

export const replace = () => ({
    'return __a()': '{__a(); process.exit()}',
    'return __a': 'process.exit()',
    'return': 'process.exit()',
});
