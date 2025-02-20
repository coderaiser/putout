'use strict';

module.exports.report = () => `Avoid suffix config when import from 'eslint-plugin-putout'`;

module.exports.replace = () => ({
    'import __imports from "eslint-plugin-putout/config"': `import __imports from 'eslint-plugin-putout'`,
});
