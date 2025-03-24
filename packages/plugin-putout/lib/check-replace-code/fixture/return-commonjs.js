module.exports.replace = () => {
    return {
        'export default createRenameProperty(__args)': `{
            export const {report, fix, traverse} = createRenameProperty(__args);
            export {
                report,
                fix,
                traverse,
            }
        }`,
    }
};
