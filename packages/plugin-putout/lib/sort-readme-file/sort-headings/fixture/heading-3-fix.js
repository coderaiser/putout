__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('add-missing-declaration', '#add-missing-declaration'), ';'), li('✅ ', link('for-each', '#for-each'), ';'), li('✅ ', link('for-entries', '#for-entries'), ';'), li('✅ ', link('for-entries-n', '#for-entries-n'), ';'), li('✅ ', link('for-in-negative', '#for-in-negative'), ';'), li('✅ ', link('for-in-positive', '#for-in-positive'), ';'), li('✅ ', link('for-length', '#for-length'), ';'), li('✅ ', link('for-n', '#for-n'), ';'), li('✅ ', link('from-while', '#from-while'), ';'), li('✅ ', link('map', '#map'), ';'), li('✅ ', link('reduce', '#reduce'), ';'), li('✅ ', link('remove-unused-variables', '#remove-unused-variables'), ';'), li('✅ ', link('remove-useless', '#remove-useless'), ';'), li('✅ ', link('remove-useless-array-from', '#remove-useless-array-from'), ';'), li('✅ ', link('remove-useless-variables', '#remove-useless-variables'), ';'), li('✅ ', link('to-for-n', '#to-for-n'), ';')),
    heading(2, 'Configuration'),
    codeblock('json', `
        {
            "rules": {
            }
        }
    `),
    ,
]);
