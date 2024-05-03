export default {
    'lint-all': async () => `MADRUN_NAME=1 ${await run('lint:*')}`,
}
