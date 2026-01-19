import {
    stat,
    unlink,
    readFile,
} from 'node:fs/promises';
import {tryToCatch} from 'try-to-catch';
import {stub} from 'supertape';
import {
    createTest,
    _createProcess,
    _createNoProcess,
    _createComparePlaces,
    _addDot,
} from './index.js';
import {createUpdate} from '../../test/update.js';

const test = createTest(import.meta.url, {
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

const update = createUpdate();

const CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

test('putout: test: processor: process', async ({process}) => {
    await process('eslintrc');
});

test('putout: test: processor: no process', async ({noProcess}) => {
    await noProcess('empty-script.html', null, ['svelte']);
});

test('putout: test: processor: no process: UPDATE', async ({noProcess, calledWith}) => {
    const unlink = stub();
    
    update(1);
    globalThis.unlink = unlink;
    await noProcess('empty-script.html', null, ['svelte']);
    delete globalThis.unlink;
    update(0);
    
    const name = new URL('fixture/empty-script-fix.html', import.meta.url).pathname;
    calledWith(unlink, [name]);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: no process: UPDATE: not clean', async ({noProcess, ok}) => {
    update(1);
    await noProcess('empty-script.html', null, ['svelte']);
    update(0);
    
    const name = new URL('fixture/empty-script-fix.html', import.meta.url).pathname;
    const [error] = await tryToCatch(stat, name);
    
    ok(error, 'should remove file');
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE', async ({process, calledWith}) => {
    update(1);
    
    const writeFile = stub();
    
    globalThis.writeFile = writeFile;
    
    await process('eslintrc');
    
    delete globalThis.writeFile;
    update();
    
    const name = new URL('fixture/eslintrc-fix.json', import.meta.url).pathname;
    const data = await readFile(name, 'utf8');
    
    calledWith(writeFile, [name, data]);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: no fixture', async ({process, ok}) => {
    update(1);
    
    await process('no-fixture');
    
    update();
    
    const nameOutput = new URL('fixture/no-fixture-fix.json', import.meta.url).pathname;
    
    const result = stat(nameOutput);
    
    await unlink(nameOutput);
    
    ok(result, 'should create output file');
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: no global', async ({process}) => {
    update(1);
    await process('eslintrc');
    
    update();
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: not a number', async ({process, notCalled}) => {
    update('hello');
    
    const writeFile = stub();
    
    globalThis.writeFile = writeFile;
    
    await process('eslintrc');
    
    delete globalThis.writeFile;
    update();
    
    notCalled(writeFile);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: process: no filename', (t) => {
    const fail = stub();
    const createRunner = _createProcess();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: no process: no filename', (t) => {
    const fail = stub();
    const createRunner = _createNoProcess();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('style.css', []);
});

test('putout: test: processor: comparePlaces: no filename', (t) => {
    const fail = stub();
    const createRunner = _createComparePlaces();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: addDot', (t) => {
    t.equal(_addDot(''), '');
    t.end();
});
