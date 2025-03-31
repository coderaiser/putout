export const report = () => `Avoid suffix config when import from 'eslint-plugin-putout'`;

export const replace = () => ({
    'import __imports from "eslint-plugin-putout/config"': `import __imports from 'eslint-plugin-putout'`,
    'require("eslint-plugin-putout/config")': 'require("eslint-plugin-putout")',
});
