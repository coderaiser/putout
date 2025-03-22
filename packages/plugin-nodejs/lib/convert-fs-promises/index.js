export const report = () => '"fs/promises" should be used instead of "fs.promises"';

export const replace = () => ({
    'const __a = require("fs").promises': 'const __a = require("fs/promises")',
});
