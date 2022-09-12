'use strict';

const nPlugin = require('eslint-plugin-n');
const {FlatCompat} = require('@eslint/eslintrc');
const putoutPlugin = require('..');

const getPutoutConfig = (name) => compat.config(putoutPlugin.configs[name]);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const n = compat.config(nPlugin.configs.recommended);

const plugins = [{
    plugins: {
        putout: putoutPlugin,
    },
}];

module.exports.recommended = [
    ...n,
    ...getPutoutConfig('recommended'),
    ...plugins,
];

module.exports.safe = [
    ...n,
    ...compat.config(putoutPlugin.configs.safe),
    ...getPutoutConfig('safe'),
    ...plugins,
];

module.exports.safeAlign = [
    ...n,
    ...getPutoutConfig('safe+align'),
    ...plugins,
];

