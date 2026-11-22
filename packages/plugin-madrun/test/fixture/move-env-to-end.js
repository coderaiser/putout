export default {
    'test:e2e': () => [{
        SUPERTAPE_TIMEOUT: '60000',
    }, `tape 'test/e2e/**/*.spec.js'`],
    'lint': () => 'putout .',
};
