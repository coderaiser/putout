import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'wast',
    processors: ['wasm'],
    plugins: ['wasm', 'arguments'],
});

test('putout: processor: wasm: get-local', async ({process}) => {
    await process('get-local');
});

test('putout: processor: wasm: set-local', async ({process}) => {
    await process('set-local');
});

test('putout: processor: wasm: remove-useless-args', async ({process}) => {
    await process('remove-useless-args');
});

test('putout: processor: wasm: remove-unused', async ({process}) => {
    await process('remove-unused');
});

test('putout: processor: wasm: apply-nesting', async ({process}) => {
    await process('apply-nesting');
});

test('putout: processor: wasm: local: wat', async ({noProcess}) => {
    await noProcess('local');
});

test('putout: processor: wasm: error', async ({comparePlaces}) => {
    await comparePlaces('error', [{
        position: {
            column: 1,
            line: 1,
        },
        message: 'Invalid array length',
        rule: 'wasm-parser-error (wasm)',
    }]);
});

test('putout: processor: wasm: places: set-local', async ({comparePlaces}) => {
    await comparePlaces('set-local', [{
        message: 'Use nestging',
        position: {
            column: 8,
            line: 6,
        },
        rule: 'wasm/apply-nesting',
    }, {
        message: `Use 'local.set' instead of 'set_local'`,
        position: {
            column: 8,
            line: 4,
        },
        rule: 'wasm/convert-set-local-to-local-set',
    }, {
        message: `Use 'local.set' instead of 'set_local'`,
        position: {
            column: 8,
            line: 5,
        },
        rule: 'wasm/convert-set-local-to-local-set',
    }]);
});

test('putout: processor: wasm: places: get-local', async ({comparePlaces}) => {
    await comparePlaces('get-local', [{
        message: `Use 'local.get' instead of 'get_local'`,
        position: {
            column: 16,
            line: 4,
        },
        rule: 'wasm/convert-get-local-to-local-get',
    }, {
        message: `Use 'local.get' instead of 'get_local'`,
        position: {
            column: 30,
            line: 4,
        },
        rule: 'wasm/convert-get-local-to-local-get',
    }]);
});
