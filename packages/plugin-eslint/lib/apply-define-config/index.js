'use strict';

module.exports.report = () => `Use 'defineConfig' instead of 'createESLintConfig'`;

module.exports.replace = () => ({
    'createESLintConfig(__args)': 'defineConfig(__args)',
});
