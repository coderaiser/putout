import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {stub} from 'supertape';
import {createTest} from './eslint.js';
import {createUpdate} from '../../test/update.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const test = createTest(import.meta.url);

const NOT_CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

const update = createUpdate();

test('test: eslint: export', async ({equal}) => {
    const eslint = await import('./eslint.js');
    const testEslint = await import('@putout/test/eslint');
    
    equal(eslint, testEslint);
});

test('test: eslint: process', async ({process}) => {
    await process('process');
});

test('test: eslint: process: UPDATE', async ({process}) => {
    update(1);
    await process('process');
    update();
}, NOT_CHECK_ASSERTIONS_COUNT);

test('test: eslint: process: UPDATE: stub', async ({process, calledWith}) => {
    update(1);
    const writeFileSync = stub();
    
    globalThis.writeFileSync = writeFileSync;
    
    await process('process');
    
    update();
    delete globalThis.writeFileSync;
    
    const name = join(__dirname, 'fixture', 'process-fix.js');
    const data = 'const a = 5;\n\n';
    
    calledWith(writeFileSync, [name, data]);
}, NOT_CHECK_ASSERTIONS_COUNT);

test('test: eslint: noProcess: UPDATE', async ({noProcess, calledWith}) => {
    const {unlinkSync} = globalThis;
    const unlinkStub = stub();
    
    globalThis.unlinkSync = unlinkStub();
    
    update(1);
    await noProcess('no-process');
    update();
    
    globalThis.unlinkSync = unlinkSync;
    
    calledWith(unlinkStub, []);
}, NOT_CHECK_ASSERTIONS_COUNT);

test('test: eslint: noProcess: UPDATE: stub', async ({noProcess, calledWith}) => {
    update(1);
    const unlinkSync = stub();
    
    globalThis.unlinkSync = unlinkSync;
    
    await noProcess('no-process');
    
    update();
    delete globalThis.unlinkSync;
    
    const name = join(__dirname, 'fixture', 'no-process-fix.js');
    
    calledWith(unlinkSync, [name]);
}, NOT_CHECK_ASSERTIONS_COUNT);

test('test: eslint: noProcess', async ({noProcess}) => {
    await noProcess('no-process');
});

test('test: eslint: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('operator-linebreak', [{
        message: `There should be no line break before or after '='.`,
        position: {
            column: 5,
            line: 2,
        },
        rule: '@stylistic/operator-linebreak (eslint)',
    }]);
});

test('test: eslint: comparePlaces: overrides', async ({comparePlaces}) => {
    const overrides = {
        rules: {
            '@stylistic/operator-linebreak': 'off',
        },
    };
    
    await comparePlaces('operator-linebreak', [], overrides);
});

test('test: eslint: comparePlaces: overrides: ESM', async ({comparePlaces}) => {
    const overrides = {
        rules: {
            'putout/putout': ['error', {
                ignore: ['!fixture'],
                plugins: [
                    'apply-nullish-coalescing',
                ],
            }],
        },
    };
    
    const places = [{
        message: `Avoid useless argument 'a' (arguments/remove-useless)`,
        position: {
            column: 5,
            line: 4,
        },
        rule: 'putout/putout (eslint)',
    }];
    
    return await comparePlaces('sync-esm', places, overrides);
});

test('test: eslint: noProcess: overrides', async ({noProcess}) => {
    const overrides = {
        rules: {
            '@stylistic/operator-linebreak': 'off',
        },
    };
    
    await noProcess('operator-linebreak', overrides);
});

test('test: eslint: ts: semi', async ({process}) => {
    await process('semi');
});

test('test: eslint: report: no plugins', (t) => {
    const failStub = stub().returns({
        is: true,
    });
    
    t.report('report', 'message', failStub);
    
    const expected = [
        '☝️ Looks like plugins not passed',
    ];
    
    t.calledWith(failStub, expected);
    t.end();
}, NOT_CHECK_ASSERTIONS_COUNT);

test('test: eslint: transform: no plugins', (t) => {
    const failStub = stub().returns({
        is: true,
    });
    
    t.transform('transform', failStub);
    
    const expected = [
        '☝️ Looks like plugins not passed',
    ];
    
    t.calledWith(failStub, expected);
    t.end();
}, NOT_CHECK_ASSERTIONS_COUNT);
