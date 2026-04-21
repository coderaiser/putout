export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'import montag from "montag"': 'import {montag} from "montag"',
    'const montag = require("montag")': 'const {montag} = require("montag")',
});
