export const report = () => `Use destructuring when require 'test' -> '{test}'`;

export const replace = () => ({
    'const test = require("supertape")': 'const {test} = require("supertape")',
});
