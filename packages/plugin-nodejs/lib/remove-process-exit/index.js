export const report = () => '"process.exit" should not be used';

export const replace = () => ({
    'process.exit()': '',
    'process["exit"]()': '',
});
