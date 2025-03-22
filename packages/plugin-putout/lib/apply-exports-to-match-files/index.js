export const report = () => `Apply 'exports' to 'matchFiles`;

export const replace = () => ({
    'export default matchFiles(__args)': `{
    	const {report, fix, scan} = matchFiles(__args);
        export {
            report,
            fix,
            scan,
        };
    }`,
});
