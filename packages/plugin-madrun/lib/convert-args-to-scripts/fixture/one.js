const c = {
    'watch:test': async () => `nodemon -w lib -x ${await run('test')}`,
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
}
