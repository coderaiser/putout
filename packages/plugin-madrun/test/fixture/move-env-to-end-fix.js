export default {
    'test:e2e': () => [`tape 'test/e2e/**/*.spec.js'`, {
        SUPERTAPE_TIMEOUT: '60000',
    }],
    'lint': () => 'putout .',
};
