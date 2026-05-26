__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/help.js', `
        export const help = 'hello';
    `],
    '/test/',
    ['/test/cli.js', `
        import {help} from '../lib/help'
    `],
]);
