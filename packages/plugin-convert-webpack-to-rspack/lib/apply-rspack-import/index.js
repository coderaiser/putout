import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'rspack' instead of 'webpack'`;

export const replace = () => ({
    'import webpack from "webpack"': (vars, path) => {
        rename(path, 'webpack', 'rspack');
        return 'import {rspack} from "@rspack/core"';
    },
});
