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
    heading(2, 'for'),
    blockquote(paragraph('The ', code('for'), ' statement creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement to be executed in the loop.'), paragraph('(c) ', link('MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for'))),
    heading(3, 'for-n'),
    heading(4, '❌ Example of incorrect code'),
    codeblock('js', `
        const n = items.length;
        
        for (let i = 0; i < n; i++) {
            const item = items[i];
            log(item);
        }
    `),
    heading(4, '✅ Example of correct code'),
    codeblock('js', `
        for (const item of items) {
            log(item);
        }
    `),
    heading(3, 'for-length'),
    heading(4, '❌ Example of incorrect code'),
    codeblock('js', `
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            console.log(item);
        }
    `),
    heading(4, '✅ Example of correct code'),
    codeblock('js', `
        for (const item of items) {
            log(item);
        }
    `),
    heading(3, 'from-while'),
    blockquote(paragraph('The ', code('while'), ' statement creates a loop that executes a specified statement as long as the test condition evaluates to true. The condition is evaluated before executing the statement.'), paragraph('(c) ', link('MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while'))),
    paragraph('Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/e4faebbc52bc2410425facc557b9acc7/9db52e3880190fe4f898ee6ac2722598073edf01'), '.'),
    heading(4, '❌ Example of incorrect code'),
    codeblock('js', `
        let i = 0;
        
        while (i < node.signature.params.length) {
            const {name} = node.signature.params[i];
            
            params.push(identifier(name.value));
            
            i = i + 1;
        }
    `),
    heading(4, '✅ Example of correct code'),
    codeblock('js', `
        for (const {name} of node.signature.params) {
            params.push(identifier(name.value));
        }
    `),
]);
