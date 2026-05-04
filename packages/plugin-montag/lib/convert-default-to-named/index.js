export const report = () => `Use '{montag}' instead of 'montag'`;

export const replace = () => ({
    'import montag from "montag"': 'import {montag} from "montag"',
    'const montag = require("montag")': 'const {montag} = require("montag")',
});
