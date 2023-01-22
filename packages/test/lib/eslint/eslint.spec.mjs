import {
    dirname,
    join,
} from 'path';
import {fileURLToPath} from 'url';
import {stub} from 'supertape';
import {createTest} from './eslint.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const test = createTest(import.meta.url);

test('test: eslint: export', async ({equal}) => {
    const eslint = await import('./eslint.mjs');
    const testEslint = await import('@putout/test/eslint');
    
    equal(eslint, testEslint);
});

test('test: eslint: process', async ({process}) => {
    await process('operator-linebreak');
});

test('test: eslint: process: UPDATE', async ({process}) => {
    global.process.env.UPDATE = '1';
    await process('operator-linebreak');
    delete global.process.env.UPDATE;
}, {checkAssertionsCount: false});

test('test: eslint: process: UPDATE: stub', async ({process, calledWith}) => {
    global.process.env.UPDATE = '1';
    const writeFileSync = stub();
    
    global.writeFileSync = writeFileSync;
    
    await process('operator-linebreak');
    
    delete global.process.env.UPDATE;
    delete global.writeFileSync;
    
    const name = join(__dirname, 'fixture', 'operator-linebreak-fix.js');
    const data = 'const a = 5;\n\n';
    
    calledWith(writeFileSync, [name, data]);
}, {checkAssertionsCount: false});

test('test: eslint: noProcess: UPDATE', async ({noProcess}) => {
    global.process.env.UPDATE = '1';
    await noProcess('operator-linebreak-fix');
    delete global.process.env.UPDATE;
}, {checkAssertionsCount: false});

test('test: eslint: noProcess: UPDATE: stub', async ({noProcess, calledWith}) => {
    global.process.env.UPDATE = '1';
    const unlinkSync = stub();
    
    global.unlinkSync = unlinkSync;
    
    await noProcess('operator-linebreak-fix');
    
    delete global.process.env.UPDATE;
    delete global.unlinkSync;
    
    const name = join(__dirname, 'fixture', 'operator-linebreak-fix-fix.js');
    
    calledWith(unlinkSync, [name]);
}, {checkAssertionsCount: false});

test('test: eslint: noProcess', async ({noProcess}) => {
    await noProcess('operator-linebreak-fix');
});

test('test: eslint: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('operator-linebreak', [{
        message: `There should be no line break before or after '='.`,
        position: {
            column: 1,
            line: 2,
        },
        rule: 'operator-linebreak (eslint)',
    }]);
});

test('test: eslint: comparePlaces: overrides', async ({comparePlaces}) => {
    const overrides = {
        rules: {
            'operator-linebreak': 'off',
        },
    };
    await comparePlaces('operator-linebreak', [], overrides);
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
}, {checkAssertionsCount: false});

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
}, {checkAssertionsCount: false});

