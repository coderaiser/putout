{
    import module from 'node:module';

    const {createRequire: _createRequire = returns(noop)} = module;
}
const require = createRequire(import.meta.url);
