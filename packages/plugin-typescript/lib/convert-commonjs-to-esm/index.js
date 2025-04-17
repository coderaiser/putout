export const report = () => `Use 'ESM' instead of 'CommonJS'`;

export const replace = () => ({
    'export = __a': 'export default __a',
    'import __a = require("__b")': 'import __a from "__b"',
});
