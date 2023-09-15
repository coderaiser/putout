import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'createPlugin()' instead of 'wrap()'`;

export const replace = () => ({
    'const wrap = require("../wrap")': (vars, path) => {
        rename(path, 'wrap', 'createPlugin');
        return 'const {createPlugin} = require("@putout/eslint/create-plugin")';
    },
});
