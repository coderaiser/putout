ruleTester.run('remove-newline-after-default-import', rule, {
    invalid: [{
        errors: [{
            'message': 'Remove newline before t.end()',
            type: 'CallExpression',
        }],
    }],
});

const a = {
    type: 'x'
}