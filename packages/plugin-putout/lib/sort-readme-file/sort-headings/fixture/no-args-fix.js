__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('add-path-arg-to-filter', '#add-path-arg-to-filter'), ';'), li('✅ ', link('add-path-arg-to-match', '#add-path-arg-to-match'), ';'), li('✅ ', link('add-test-args', '#add-test-args'), ';'), li('✅ ', link('convert-get-file-content-to-read-file-content', '#convert-get-file-content-to-read-file-content'), ';'), li('✅ ', link('includer', '#includer'), ';'), li('✅ ', link('move-require-on-top-level', '#move-require-on-top-level'), ';')),
    heading(2, 'File rules'),
    ul(li('✅ ', link('sort-readme-file', '#sort-readme-file'), ';')),
    heading(2, 'Config'),
    codeblock('json', `
    `),
    heading(2, 'add-path-arg-to-filter'),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/00a5e23e6a1a708937ef3fae2a792f86/c2fc350831f777bbb383fb65216b349edd4ec53d'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        export const filter = () => {
            return path.isStringLiteral();
        };
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        export const filter = (path) => {
            return path.isStringLiteral();
        };
    `),
    heading(2, 'add-path-arg-to-match'),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/35189d0e47c6ad1ca369e5a9287a34c1/d5fa7513a44fecc86beabd1faa8542bee7bc3e5e'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        export const match = () => ({
            'nemesis.getChar()': () => {
                return path.parentPath.isExpressionStatement();
            },
            'getChar()': ({__a}) => {
                return path.parentPath.isExpressionStatement();
            },
        });
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        export const match = () => ({
            'nemesis.getChar()': (vars, path) => {
                return path.parentPath.isExpressionStatement();
            },
            'getChar()': ({__a}, path) => {
                return path.parentPath.isExpressionStatement();
            },
        });
    `),
    heading(2, 'add-test-args'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        test('', () => {
            comparePlaces();
        });
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        test('', ({comparePlaces}) => {
            comparePlaces();
        });
    `),
    heading(2, 'convert-get-file-content-to-read-file-content'),
    paragraph('To read file content use ', link(code('readFileContent'), 'https://github.com/coderaiser/putout/tree/master/packages/operator-filesystem#readfilecontentfilepath-filepath-string'), ' and never confuse.'),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/828da75f16a526652b138948d810ed9e/754bd02869a7e4e119e9fb442dab93df7785fb56'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', 'const content = getFileContent(file);'),
    heading(3, '✅ Example of correct code'),
    codeblock('js', 'const content = readFileContent(file);'),
    heading(2, 'includer'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        module.exports.include = () => 'cons __a = __b';
        module.exports.exclude = () => 'var __a = __b';
        module.exports.include = 'cons __a = __b';
        module.exports.exclude = 'var __a = __b';
        
        module.exports.include = [
            'cons __a = __b',
        ];
        
        module.exports.exclude = [
            'var __a = __b',
        ];
        
        export const include = [
            'cons __a = __b',
        ];
        
        export const exclude = [
            'var __a = __b',
        ];
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        module.exports.include = () => [
            'const __a = __b',
        ];
        
        module.exports.exclude = () => [
            'var __a = __b',
        ];
        
        export const include = () => [
            'cons __a = __b',
        ];
        
        export const exclude = () => [
            'var __a = __b',
        ];
    `),
    heading(2, 'move-require-on-top-level'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        const test = require('@putout/test')(__dirname, {
            'remove-debugger': require('..'),
        });
        
        test('remove debugger: report', (t) => {
            t.transform('debugger', {
                'remove-debugger': require('..'),
            });
            t.end();
        });
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        const removeDebugger = require('..');
        
        const test = require('@putout/test')(__dirname, {
            'remove-debugger': removeDebugger,
        });
        
        test('remove debugger: report', (t) => {
            t.transform('debugger', {
                'remove-debugger': removeDebugger,
            });
            t.end();
        });
    `),
]);
