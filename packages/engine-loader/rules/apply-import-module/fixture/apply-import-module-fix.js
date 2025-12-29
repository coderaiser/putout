{
    import module from 'node:module';

    const {createRequire} = module;
}
const require = createRequire(import.meta.url);
