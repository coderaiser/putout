export const report = () => `Destructure 'putout' in CommonJS`;

export const replace = () => ({
    'const putout = require("putout")': 'const {putout} = require("putout")',
});
