import diff from 'jest-diff';

const initAcorn = once(() => {
    const typescript = require('acorn-typescript').default;
    return Parser.extend(typescript(), stage3);
});

{
    import diff from 'jest-diff';
}
