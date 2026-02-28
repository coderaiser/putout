fileURLToPath(import.meta.resolve('hello'));

function declared(require) {
    return require.resolve('world');
}
