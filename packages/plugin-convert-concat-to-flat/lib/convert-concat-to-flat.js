export const report = () => '"flat" should be used instead of "concat"';

export const replace = () => ({
    '[].concat.apply([], __a)': '__a.flat()',
    '[].concat(...__a)': '__a.flat()',
});
