export const report = () => `Avoid 'message' in 't.noReportAfterTransform()'`;

export const replace = () => ({
    't.noReportAfterTransform("__a", `__b`)': 't.noReportAfterTransform("__a")',
    't.noReportAfterTransform("__a", "__b")': 't.noReportAfterTransform("__a")',
});
