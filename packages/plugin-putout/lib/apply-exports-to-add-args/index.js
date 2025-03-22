export const report = () => `Apply exports to 'addArgs()'`;

export const replace = () => ({
    'export default addArgs(__args)': `{
         const {report, fix, traverse} = addArgs(__args);
         export {
            report,
            fix,
            traverse,
        }
    }`,
});
