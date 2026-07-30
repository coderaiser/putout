    const extensions = {
        transformCode: (t) => async (a, b) => {
            return await t.equal(a + 1, b, 'should transform code');
        },
    };

