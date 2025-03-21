export const report = () => '"operator" should be used instead of "operate"';

export const replace = () => ({
    'const __object = require("putout").operate': 'const __object = require("putout").operator',
});
