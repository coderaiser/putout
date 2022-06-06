import {createTest} from '@putout/test/processor';
const test = createTest(import.meta.url, {
    processors: [
        'wasm',
    ],
});

test('putout: processor: wasm: get-local', async ({process}) => {
    await process('get-local.wast');
});

test('putout: processor: wasm: set-local', async ({process}) => {
    await process('set-local.wast');
});

test('putout: processor: wasm: local: wat', async ({noProcess}) => {
    await noProcess('local.wat');
});

test('putout: processor: wasm: parser error', async ({comparePlaces}) => {
    await comparePlaces('error.wast', [{
        position: {
            column: 0,
            line: 1,
        },
        message: 'Invalid array length',
        rule: 'wasm-parser-error (wasm)',
    }]);
});

test('putout: processor: wasm: places: set-local', async ({comparePlaces}) => {
    await comparePlaces('set-local.wast', [{
        message: `Use 'local.set' instead of set_local`,
        position: {
            column: 5,
            line: 5,
        },
        rule: 'convert-set-local-to-local-set (wasm)',
    }, {
        message: `Use 'local.set' instead of set_local`,
        position: {
            column: 5,
            line: 6,
        },
        rule: 'convert-set-local-to-local-set (wasm)',
    }]);
});

test('putout: processor: wasm: places: get-local', async ({comparePlaces}) => {
    await comparePlaces('get-local.wast', [{
        message: `Use 'local.get' instead of get_local`,
        position: {
            column: 5,
            line: 5,
        },
        rule: 'convert-get-local-to-local-get (wasm)',
    }, {
        message: `Use 'local.get' instead of get_local`,
        position: {
            column: 5,
            line: 6,
        },
        rule: 'convert-get-local-to-local-get (wasm)',
    }]);
});

