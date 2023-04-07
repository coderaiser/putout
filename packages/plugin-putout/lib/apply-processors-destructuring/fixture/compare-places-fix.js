test('putout: processor: markdown: places', async ({comparePlaces}) => {
    await comparePlaces('place', [{
        message: 'Code blocks should be indented',
        position: {
            column: 1,
            line: 3,
        },
        rule: 'code-block-style (remark-lint)',
    }]);
});
