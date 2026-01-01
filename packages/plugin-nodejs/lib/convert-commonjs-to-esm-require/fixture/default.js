const diff = require('jest-diff').default;

const initAcorn = once(() => {
    const typescript = require('acorn-typescript').default;
    return Parser.extend(typescript(), stage3);
});

{
    const diff = require('jest-diff').default;
}
