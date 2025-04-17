export const report = () => `Use 'CommonJS' instead of 'ESM'`;

export const replace = () => ({
    'export default __a': 'export = __a',
    'import __a from "__b"': 'import __a = require("__b")',
});
