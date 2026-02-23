const {code} = putout(source, {
    plugins: [
        ['convert', convert],
    ],
});

const {code: code2} = putout(source, {
    plugins: [
        ['convert', convert],
    ],
});
