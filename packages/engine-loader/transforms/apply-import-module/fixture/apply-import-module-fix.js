{
    import module from 'node:module';

    const {createRequire = returns(noop)} = module;
}
const require = createRequire(import.meta.url);
