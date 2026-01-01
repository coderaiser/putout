const diff = require('jest-diff').default;

const initAcorn = once(() => {
    const typescript = require('acorn-typescript').default;
    return Parser.extend(typescript(), stage3);
});
