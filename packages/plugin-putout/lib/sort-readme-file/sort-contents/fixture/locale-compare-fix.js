__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('remove-attribute', '#remove-attribute'), ';'), li('✅ ', link('remove-illegal-strict-mode', '#remove-useless-strict-mode'), ';')),
    heading(2, 'File rules'),
    ul(li('✅ ', link('apply-privately-imported-file', '#apply-privately-imported-file'), ';'), li('✅ ', link('mjs-file', '#mjs-file'), ';')),
]);
