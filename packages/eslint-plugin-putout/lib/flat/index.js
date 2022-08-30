'use strict';

const putoutPlugin = require('..');
const nPlugin = require('eslint-plugin-n');

const {FlatCompat} = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const rmPlugins = (a) => {
    delete a.plugins;
    return a;
};

const nPluginReady = compat.config(nPlugin.configs.recommended).map(rmPlugins);

const config = [{
    plugins: {
        putout: putoutPlugin,
    },
}];

module.exports.recommended = [
    ...nPluginReady,
    ...compat.config(putoutPlugin.configs.recommended),
    ...config,
];

module.exports.safe = [
    ...nPluginReady,
    ...compat.config(putoutPlugin.configs.safe),
    ...config,
];

module.exports.safeAlign = [
    ...nPluginReady,
    ...compat.config(putoutPlugin.configs['safe+align']),
    ...config,
];

