export const report = () => `Use destructuring when require 'test' -> '{test}'`;

export const replace = () => ({
    'const test = require("supertape")': 'const {test} = require("supertape")',
    'const __identifier__a = require("supertape")': 'const {test: __identifier__a} = require("supertape")',
});
