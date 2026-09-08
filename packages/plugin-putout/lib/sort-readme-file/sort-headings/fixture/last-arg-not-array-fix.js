__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('convert-get-rule-to-require', '#convert-get-rule-to-require'), ';'), li('✅ ', link('includer', '#includer'), ';'), li('✅ ', link('move-require-on-top-level', '#move-require-on-top-level'), ';')),
    heading(2, 'convert-get-rule-to-require'),
    ul(li('✅ import ', link('Nested plugins', 'https://github.com/coderaiser/putout/tree/master/packages/engine-loader#nested-plugin'), ' in ', link(paragraph(bold('Deno'), ' and ', bold('Browser')), 'https://github.com/putoutjs/bundle/'), ';'), li('✅ easier bundle with rollup without ', link(code('dynamicRequireTargets'), 'https://github.com/rollup/plugins/tree/master/packages/commonjs/#dynamicrequiretargets'), ';'), li('✅ easier to migrate to ', bold('ESM'), ';')),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', 'module.exports.rules = getRule(\'remove-unused-variables\');'),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        const removeUnusedVariables = require('./remove-unused-variables');
        
        module.exports.rules = {
            'remove-unused-variables': removeUnusedVariables,
        };
    `),
    heading(2, 'includer'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
        export const exclude = [
            'var __a = __b',
        ];
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
        module.exports.include = () => [
            'const __a = __b',
        ];
    `),
    heading(2, 'move-require-on-top-level'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', `
    `),
    heading(3, '✅ Example of correct code'),
    codeblock('js', `
    `),
]);
