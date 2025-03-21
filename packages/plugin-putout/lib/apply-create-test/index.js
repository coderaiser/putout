export const report = () => `Apply 'createTest'`;

export const replace = () => ({
    'require("@putout/test")(__dirname, __a)': `createTest(__dirname, __a)`,
});
