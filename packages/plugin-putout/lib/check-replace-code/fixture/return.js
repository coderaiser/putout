export const report = () => `Apply 'exports' to 'renameFiles()`;

export const replace = () => {
    return {
        'export default renameFiles(__args)': `{
            const {report, fix, scan} = matchFiles(__args);
            export {
                report,
                fix,
                scan,
            };
        }`,
    }
};
