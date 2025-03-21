export const report = () => 'Shorten require path to putout exports';

export const replace = () => ({
    'require("putout/lib/cli/process-file")': 'require("putout/process-file")',
    'require("putout/lib/parse-options")': 'require("putout/parse-options")',
});
