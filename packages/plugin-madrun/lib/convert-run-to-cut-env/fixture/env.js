const env = {
    KEYPRESS: 1,
};

const envBreaking = {
    BABEL_TYPES_8_BREAKING: 1,
};

export default {
    'test': () => [env, `tape -f time '${dirs}/*/test/*.*' '${dirs}/*/{bin,lib,rules}/**/*.spec.*'`],
    'test:break': async () => [envBreaking, await run('test')],
};
