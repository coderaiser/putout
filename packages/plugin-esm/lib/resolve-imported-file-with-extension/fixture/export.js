__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/help.js', `
        export const help = 'hello';
    `],
    '/test/',
    ['/test/cli.js', `
        export {help} from '../lib/help'
        export * from '../lib/help'
    `],
]);
